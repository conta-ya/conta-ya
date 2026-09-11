'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface OnboardingState {
    error?: string
    success?: boolean
}

export async function completeProfessionalOnboarding(
    prevState: OnboardingState,
    formData: FormData
): Promise<OnboardingState> {
    const { userId } = await auth()

    if (!userId) {
        return { error: 'Usuario no autenticado' }
    }

    const specialty = formData.get('specialty') as string
    const licenseNumber = formData.get('licenseNumber') as string
    const collegeName = formData.get('collegeName') as string
    const documentId = formData.get('documentId') as string
    const hourlyRateStr = formData.get('hourlyRate') as string

    if (!specialty || !licenseNumber || !collegeName || !documentId || !hourlyRateStr) {
        return { error: 'Todos los campos obligatorios deben ser completados' }
    }

    const hourlyRate = parseFloat(hourlyRateStr)
    if (isNaN(hourlyRate) || hourlyRate <= 0) {
        return { error: 'El precio por consulta debe ser un número mayor a 0' }
    }

    try {
        const profile = await prisma.profile.findUnique({
            where: { clerkId: userId },
        })

        if (!profile) {
            return { error: 'No se encontró el perfil de usuario' }
        }

        // 1. Guardar DNI y actualizar el Rol a PROFESSIONAL en Profile
        await prisma.profile.update({
            where: { id: profile.id },
            data: {
                role: 'PROFESSIONAL',
                documentId: documentId,
            },
        })

        // 2. Upsert en ProfessionalProfile (incluyendo documentId en create y update)
        await prisma.professionalProfile.upsert({
            where: { profileId: profile.id },
            update: {
                specialty,
                licenseNumber,
                collegeName,
                documentId,
                hourlyRate,
            },
            create: {
                profileId: profile.id,
                specialty,
                licenseNumber,
                collegeName,
                documentId,
                hourlyRate,
            },
        })

        revalidatePath('/dashboard')
        return { success: true }
    } catch (error) {
        console.error('Error en onboarding profesional:', error)
        return { error: 'Ocurrió un error al guardar los datos o la matrícula/documento ya está registrada' }
    }
}