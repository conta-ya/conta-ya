import { auth, currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import {
    UserCheck,
    Stethoscope,
    User,
    Check,
    ChevronRight,
    ShieldCheck,
    Heart,
    Star,
    GraduationCap,
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
                <div className="w-12 h-12 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin mb-4" />
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
        <main className="p-6 md:p-12 max-w-4xl mx-auto space-y-8 bg-slate-50 text-slate-900">
            {/* Encabezado General */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                            Hola, <span className="text-emerald-900">{profile.fullName || 'Usuario'}</span>
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
                            <Stethoscope className="w-4 h-4 text-emerald-900" />
                            ¿Sos profesional? Cambiar a cuenta Profesional
                        </Link>
                    ) : (
                        <Link
                            href="/onboarding/professional"
                            className="inline-flex items-center gap-2 bg-white hover:bg-slate-100 text-slate-700 text-xs font-medium px-4 py-2.5 rounded-xl border border-slate-200 shadow-sm transition-colors"
                        >
                            <Stethoscope className="w-4 h-4 text-emerald-900" />
                            Editar Datos Profesionales
                        </Link>
                    )}
                </div>
            </div>

            {/* VISTA PACIENTE: SELECCIÓN TIPO DE AYUDA (SEGÚN MAQUETA) */}
            {profile.role === 'PATIENT' && (
                <div className="space-y-6">
                    <div className="text-center space-y-1">
                        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                            ¿Qué tipo de ayuda necesitás hoy?
                        </h2>
                        <p className="text-slate-500 text-sm">Elegí el tipo de profesional</p>
                    </div>

                    <div className="space-y-3 max-w-xl mx-auto">
                        {/* Opción 1: Psicólogo/a (Estado Selección por Defecto / Destacado) */}
                        <Link
                            href="/professionals?type=psychologist"
                            className="group flex items-center justify-between p-4 bg-white rounded-2xl border-2 border-emerald-900/80 shadow-sm hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-900">
                                    <User className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm">Psicólogo/a</h3>
                                    <p className="text-xs text-slate-500">Atención profesional</p>
                                </div>
                            </div>
                            <div className="w-6 h-6 rounded-full bg-emerald-900 flex items-center justify-center text-white">
                                <Check className="w-4 h-4 stroke-[3]" />
                            </div>
                        </Link>

                        {/* Opción 2: Acompañante Terapéutico */}
                        <Link
                            href="/professionals?type=therapist"
                            className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-700">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm">Acompañante Terapéutico</h3>
                                    <p className="text-xs text-slate-500">Apoyo y contención</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                        </Link>

                        {/* Opción 3: Coach Ontológico */}
                        <Link
                            href="/professionals?type=coach"
                            className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                                    <Star className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm">Coach Ontológico</h3>
                                    <p className="text-xs text-slate-500">Acompañamiento personal</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                        </Link>

                        {/* Opción 4: Estudiante avanzado */}
                        <Link
                            href="/professionals?type=student"
                            className="group flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-slate-300 hover:shadow-md transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 text-sm">Estudiante avanzado</h3>
                                    <p className="text-xs text-slate-500">Atención supervisada • Tarifas accesibles</p>
                                </div>
                            </div>
                            <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-slate-600 transition-colors" />
                        </Link>
                    </div>

                    {/* Caja de Certificación / Seguridad Inferior */}
                    <div className="max-w-xl mx-auto p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-900 shrink-0">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-medium text-emerald-950 leading-tight">
                            Todos los profesionales están verificados y matriculados.
                        </p>
                    </div>
                </div>
            )}

            {/* VISTA PROFESIONAL */}
            {profile.role === 'PROFESSIONAL' && profile.professionalProfile && (
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-white border border-slate-200/80 shadow-sm p-6 rounded-2xl md:col-span-2 space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <UserCheck className="w-6 h-6 text-emerald-900" />
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
                                <User className="w-4 h-4 text-emerald-900" /> Datos Personales
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
        </main>
    )
}