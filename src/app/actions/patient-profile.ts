'use server'

import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export interface PatientProfileState {
    error?: string
    success?: boolean
}

export async function updatePatientProfile(
    prevState: PatientProfileState,
    formData: FormData
): Promise<PatientProfileState> {
    const { userId } = await auth()

    if (!userId) {
        return { error: 'Usuario no autenticado' }
    }

    const phone = formData.get('phone') as string
    const documentId = formData.get('documentId') as string
    const gender = formData.get('gender') as string
    const birthdayStr = formData.get('birthday') as string
    const healthInsurance = formData.get('healthInsurance') as string

    if (!phone || !documentId || !gender || !birthdayStr) {
        return { error: 'DNI, teléfono, género y fecha de nacimiento son obligatorios' }
    }

    const birthday = new Date(birthdayStr)
    if (isNaN(birthday.getTime())) {
        return { error: 'Fecha de nacimiento inválida' }
    }

    try {
        await prisma.profile.update({
            where: { clerkId: userId },
            data: {
                phone,
                documentId,
                gender,
                birthday,
                healthInsurance: healthInsurance || null,
            },
        })

        revalidatePath('/dashboard')
        revalidatePath('/profile')
        return { success: true }
    } catch (error) {
        console.error('Error al actualizar perfil de paciente:', error)
        return { error: 'Ocurrió un error al guardar los datos del perfil' }
    }
}