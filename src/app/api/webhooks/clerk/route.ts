import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Por favor agrega CLERK_WEBHOOK_SECRET en las variables de entorno')
    }

    // Obtener cabeceras de Svix para verificación
    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new NextResponse('Error: Faltan cabeceras de Svix', { status: 400 })
    }

    // Obtener el cuerpo de la petición
    const payload = await req.json()
    const body = JSON.stringify(payload)

    // Verificar la firma del webhook con Svix
    const wh = new Webhook(WEBHOOK_SECRET)
    let evt: WebhookEvent

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error al verificar el webhook de Clerk:', err)
        return new NextResponse('Error de verificación', { status: 400 })
    }

    const eventType = evt.type

    // 1. EVENTO: CREAR USUARIO
    if (eventType === 'user.created') {
        const { id, email_addresses, first_name, last_name, image_url, phone_numbers, unsafe_metadata } = evt.data

        const primaryEmail = email_addresses.find((e) => e.id === evt.data.primary_email_address_id)?.email_address
        const primaryPhone = phone_numbers?.[0]?.phone_number || null

        if (!primaryEmail) {
            return new NextResponse('Email no encontrado', { status: 400 })
        }

        const fullName = `${first_name || ''} ${last_name || ''}`.trim() || 'Usuario sin nombre'
        // Permite asignar rol por defecto o desde la metadata de Clerk
        const role = (unsafe_metadata?.role as 'PATIENT' | 'PROFESSIONAL' | 'ADMIN') || 'PATIENT'

        await prisma.profile.create({
            data: {
                clerkId: id,
                email: primaryEmail,
                fullName,
                avatarUrl: image_url,
                phone: primaryPhone,
                role,
            },
        })
    }

    // 2. EVENTO: ACTUALIZAR USUARIO
    if (eventType === 'user.updated') {
        const { id, email_addresses, first_name, last_name, image_url, phone_numbers, unsafe_metadata } = evt.data

        const primaryEmail = email_addresses.find((e) => e.id === evt.data.primary_email_address_id)?.email_address
        const primaryPhone = phone_numbers?.[0]?.phone_number || null
        const fullName = `${first_name || ''} ${last_name || ''}`.trim() || 'Usuario sin nombre'

        await prisma.profile.update({
            where: { clerkId: id },
            data: {
                email: primaryEmail,
                fullName,
                avatarUrl: image_url,
                phone: primaryPhone,
                ...(unsafe_metadata?.role && {
                    role: unsafe_metadata.role as 'PATIENT' | 'PROFESSIONAL' | 'ADMIN',
                }),
            },
        })
    }

    // 3. EVENTO: ELIMINAR USUARIO
    if (eventType === 'user.deleted') {
        const { id } = evt.data

        if (id) {
            await prisma.profile.delete({
                where: { clerkId: id },
            })
        }
    }

    return NextResponse.json({ success: true, message: 'Webhook procesado' }, { status: 200 })
}