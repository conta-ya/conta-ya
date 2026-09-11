import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import ProfileClientForm from './profile-client-form'

export default async function ProfilePage() {
    const { userId } = await auth()

    if (!userId) {
        redirect('/sign-in')
    }

    // 1. Cargar el perfil del usuario desde Supabase/Prisma
    const profile = await prisma.profile.findUnique({
        where: { clerkId: userId },
    })

    // 2. Formatear la fecha para la etiqueta <input type="date" /> (YYYY-MM-DD)
    const formattedBirthday = profile?.birthday
        ? new Date(profile.birthday).toISOString().split('T')[0]
        : ''

    const initialData = {
        documentId: profile?.documentId || '',
        phone: profile?.phone || '',
        gender: profile?.gender || '',
        birthday: formattedBirthday,
        healthInsurance: profile?.healthInsurance || '',
    }

    return <ProfileClientForm initialData={initialData} />
}