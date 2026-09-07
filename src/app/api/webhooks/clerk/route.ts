import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env')
    }

    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new NextResponse('Error occurred -- no svix headers', { status: 400 })
    }

    const payload = await req.json()
    const body = JSON.stringify(payload)

    const wh = new Webhook(WEBHOOK_SECRET)
    let evt: WebhookEvent

    try {
        // Solución al error de TypeScript: Casteo seguro mediante unknown
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as unknown as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return new NextResponse('Error occurred', { status: 400 })
    }

    const eventType = evt.type

    if (eventType === 'user.created' || eventType === 'user.updated') {
        const { id, email_addresses, first_name, last_name, unsafe_metadata } = evt.data
        const primaryEmail = email_addresses?.[0]?.email_address

        if (!primaryEmail) {
            return new NextResponse('No primary email found', { status: 400 })
        }

        const role = (unsafe_metadata?.role as 'PATIENT' | 'PROFESSIONAL' | 'ADMIN') || 'PATIENT'
        const fullName = `${first_name || ''} ${last_name || ''}`.trim() || 'Usuario'

        await prisma.profile.upsert({
            where: { clerkId: id },
            update: {
                email: primaryEmail,
                fullName,
            },
            create: {
                clerkId: id,
                email: primaryEmail,
                fullName,
                role,
            },
        })
    }

    if (eventType === 'user.deleted') {
        const { id } = evt.data
        if (id) {
            await prisma.profile.deleteMany({
                where: { clerkId: id },
            })
        }
    }

    return NextResponse.json({ message: 'Webhook processed successfully' }, { status: 200 })
}