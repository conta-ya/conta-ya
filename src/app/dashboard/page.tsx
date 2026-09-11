import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import {
    UserCheck,
    Stethoscope,
    Search,
    User,
    ArrowRight,
} from 'lucide-react'

export default async function DashboardPage() {
    const { userId } = await auth()
    const user = await currentUser()

    if (!userId) {
        redirect('/sign-in')
    }

    // 1. Buscar o auto-crear perfil en Supabase
    let profile = await prisma.profile.findUnique({
        where: { clerkId: userId },
        include: {
            professionalProfile: true,
        },
    })

    if (!profile && user) {
        const userEmail = user.emailAddresses[0]?.emailAddress || ''
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'Usuario'

        profile = await prisma.profile.create({
            data: {
                clerkId: userId,
                email: userEmail,
                fullName: fullName,
                role: 'PATIENT',
            },
            include: {
                professionalProfile: true,
            },
        })
    }

    if (!profile) {
        return (
            <div className="min-h-[70vh] text-slate-800 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mb-4" />
                <h1 className="text-xl font-semibold text-slate-900">Configurando tu cuenta...</h1>
            </div>
        )
    }

    // 2. REDIRECCIÓN AUTOMÁTICA SEGÚN COMPLETITUD DE DATOS
    if (profile.role === 'PROFESSIONAL' && !profile.professionalProfile) {
        redirect('/onboarding/professional')
    }

    if (
        profile.role === 'PATIENT' &&
        (!profile.documentId || !profile.phone || !profile.gender || !profile.birthday)
    ) {
        redirect('/profile')
    }

    return (
        <main className="p-6 md:p-12 max-w-7xl mx-auto space-y-8 bg-slate-50 text-slate-900">
            {/* Encabezado General */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                            Hola, <span className="text-teal-600">{profile.fullName || 'Usuario'}</span>
                        </h1>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-medium border border-slate-300">
                            {profile.role === 'PROFESSIONAL' ? 'Profesional' : 'Paciente'}
                        </span>
                    </div>
                    <p className="text-slate-500 text-sm">{profile.email}</p>
                </div>

                <div className="flex items-center gap-3">
                    {profile.role === 'PATIENT' ? (
                        <Link
                            href="/onboarding/professional"
                            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-colors"
                        >
                            <Stethoscope className="w-4 h-4 text-teal-600" />
                            ¿Eres profesional? Cambiar a cuenta Profesional
                        </Link>
                    ) : (
                        <Link
                            href="/onboarding/professional"
                            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-colors"
                        >
                            <Stethoscope className="w-4 h-4 text-teal-600" />
                            Editar Datos Profesionales
                        </Link>
                    )}
                </div>
            </div>

            {/* VISTA PROFESIONAL */}
            {profile.role === 'PROFESSIONAL' && profile.professionalProfile && (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white border border-slate-200/80 shadow-sm p-6 rounded-2xl md:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <UserCheck className="w-6 h-6 text-teal-600" />
                                <h2 className="text-lg font-semibold text-slate-900">Perfil Profesional</h2>
                            </div>
                            <span className="text-xs px-3 py-1 rounded-full font-semibold border bg-amber-50 text-amber-700 border-amber-200">
                                {profile.professionalProfile.verificationStatus}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
                            <div>
                                <span className="text-slate-500 block">Especialidad</span>
                                <strong className="text-slate-800 text-sm">{profile.professionalProfile.specialty}</strong>
                            </div>
                            <div>
                                <span className="text-slate-500 block">Matrícula</span>
                                <strong className="text-slate-800 text-sm">{profile.professionalProfile.licenseNumber}</strong>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 shadow-sm p-6 rounded-2xl flex flex-col justify-between">
                        <div>
                            <h3 className="font-semibold text-sm mb-2 flex items-center gap-2 text-slate-900">
                                <User className="w-4 h-4 text-teal-600" /> Datos Personales
                            </h3>
                            <div className="space-y-1.5 text-xs text-slate-600">
                                <p><strong className="text-slate-800">DNI:</strong> {profile.documentId || 'Sin registrar'}</p>
                                <p><strong className="text-slate-800">Teléfono:</strong> {profile.phone || 'Sin registrar'}</p>
                            </div>
                        </div>
                        <Link
                            href="/profile"
                            className="mt-6 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium py-2.5 rounded-xl border border-slate-200 transition-colors block"
                        >
                            Editar Perfil
                        </Link>
                    </div>
                </div>
            )}

            {/* VISTA PACIENTE */}
            {profile.role === 'PATIENT' && (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white border border-slate-200/80 shadow-sm p-8 rounded-3xl md:col-span-2 space-y-4 flex flex-col justify-between">
                        <div className="space-y-3">
                            <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center border border-teal-200">
                                <Search className="w-6 h-6" />
                            </div>
                            <h2 className="text-2xl font-bold text-slate-900">Encuentra la atención que necesitas</h2>
                            <p className="text-slate-600 text-sm">
                                Conéctate en tiempo real con profesionales de la salud mental verificados.
                            </p>
                        </div>

                        <div className="pt-4">
                            <Link
                                href="/professionals"
                                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-3 rounded-xl transition-all text-sm shadow-md shadow-teal-600/20"
                            >
                                Explorar Directorio
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                    <div className="bg-white border border-slate-200/80 shadow-sm p-6 rounded-3xl flex flex-col justify-between">
                        <div className="space-y-3 text-xs text-slate-600">
                            <h3 className="font-semibold text-base text-slate-900 flex items-center gap-2">
                                <User className="w-4 h-4 text-teal-600" /> Mi Perfil
                            </h3>
                            <p><strong className="text-slate-800">DNI:</strong> {profile.documentId}</p>
                            <p><strong className="text-slate-800">Teléfono:</strong> {profile.phone}</p>
                            <p><strong className="text-slate-800">Género:</strong> {profile.gender}</p>
                            <p><strong className="text-slate-800">Obra Social:</strong> {profile.healthInsurance || 'Particular'}</p>
                        </div>

                        <Link
                            href="/profile"
                            className="mt-4 text-center bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs py-2.5 rounded-xl border border-slate-200 transition-colors block"
                        >
                            Editar Perfil
                        </Link>
                    </div>
                </div>
            )}
        </main>
    )
}