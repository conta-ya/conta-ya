'use server'

import { prisma } from '@/lib/prisma'

export async function getVerifiedProfessionals(specialtyQuery?: string) {
    try {
        const professionals = await prisma.professionalProfile.findMany({
            where: {
                verificationStatus: 'APPROVED', // Muestra solo profesionales aprobados
                ...(specialtyQuery
                    ? {
                        specialty: {
                            contains: specialtyQuery,
                            mode: 'insensitive',
                        },
                    }
                    : {}),
            },
            include: {
                profile: {
                    select: {
                        fullName: true,
                        email: true,
                    },
                },
            },
            orderBy: {
                isOnline: 'desc', // Prioriza los que están conectados en tiempo real
            },
        })

        return { professionals, error: null }
    } catch (error) {
        console.error('Error fetching professionals:', error)
        return { professionals: [], error: 'Error al cargar los profesionales' }
    }
}