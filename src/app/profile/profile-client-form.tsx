'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { updatePatientProfile, PatientProfileState } from '@/app/actions/patient-profile'
import {
    User,
    ShieldCheck,
    ArrowLeft,
    Loader2,
    Phone,
    CreditCard,
    HeartPulse,
    Calendar,
    Users,
    Stethoscope,
} from 'lucide-react'
import Link from 'next/link'

interface InitialData {
    documentId?: string
    phone?: string
    gender?: string
    birthday?: string
    healthInsurance?: string
}

const initialState: PatientProfileState = {}

export default function ProfileClientForm({
    initialData = {},
}: {
    initialData?: InitialData
}) {
    const router = useRouter()
    const [state, formAction, isPending] = useActionState(updatePatientProfile, initialState)

    useEffect(() => {
        if (state.success) {
            router.push('/dashboard')
            router.refresh()
        }
    }, [state.success, router])

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center p-6 font-sans">
            <div className="max-w-xl w-full bg-white border border-slate-200/80 rounded-[32px] p-8 shadow-xl relative">

                {/* Enlaces de retorno */}
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-xs text-slate-500 hover:text-slate-800 transition-colors font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" /> Volver al Panel
                    </Link>

                    <Link
                        href="/onboarding/professional"
                        className="inline-flex items-center gap-1.5 text-xs text-emerald-900 hover:text-emerald-950 font-bold transition-colors"
                    >
                        <Stethoscope className="w-3.5 h-3.5" /> ¿Sos profesional? Registrá tu matrícula
                    </Link>
                </div>

                {/* Cabecera */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-900 shadow-sm">
                        <User className="w-5 h-5" />
                    </div>
                    <h1 className="text-2xl font-black text-emerald-950 tracking-tight">
                        Completar Datos Personales
                    </h1>
                </div>

                <p className="text-slate-500 text-xs mb-6 leading-relaxed">
                    Ingresá tus datos personales y de contacto para agilizar la atención con tus profesionales.
                </p>

                {/* Mensajes de Error */}
                {state.error && (
                    <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl font-medium">
                        {state.error}
                    </div>
                )}

                {/* Formulario con valores iniciales */}
                <form action={formAction} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                                <CreditCard className="w-3.5 h-3.5 text-emerald-900" />
                                DNI / Documento *
                            </label>
                            <input
                                type="text"
                                name="documentId"
                                required
                                defaultValue={initialData.documentId || ''}
                                placeholder="Ej: 38123456"
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-900 focus:ring-1 focus:ring-emerald-900 transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-emerald-900" />
                                Teléfono (WhatsApp) *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                defaultValue={initialData.phone || ''}
                                placeholder="Ej: +54 385 1234567"
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-900 focus:ring-1 focus:ring-emerald-900 transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-emerald-900" />
                                Género *
                            </label>
                            <select
                                name="gender"
                                required
                                defaultValue={initialData.gender || ''}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-emerald-900 focus:ring-1 focus:ring-emerald-900 transition-all"
                            >
                                <option value="">Selecciona...</option>
                                <option value="MASCULINO">Masculino</option>
                                <option value="FEMENINO">Femenino</option>
                                <option value="OTRO">Otro / Prefiero no decir</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-emerald-900" />
                                Fecha de Nacimiento *
                            </label>
                            <input
                                type="date"
                                name="birthday"
                                required
                                defaultValue={initialData.birthday || ''}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-emerald-900 focus:ring-1 focus:ring-emerald-900 transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                            <HeartPulse className="w-3.5 h-3.5 text-emerald-900" />
                            Obra Social o Prepaga (Opcional)
                        </label>
                        <input
                            type="text"
                            name="healthInsurance"
                            defaultValue={initialData.healthInsurance || ''}
                            placeholder="Ej: OSDE, Swiss Medical, Particular..."
                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-900 focus:ring-1 focus:ring-emerald-900 transition-all"
                        />
                    </div>

                    <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex items-start gap-3 mt-3">
                        <ShieldCheck className="w-5 h-5 text-emerald-900 shrink-0 mt-0.5" />
                        <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                            Tus datos personales están protegidos y resguardados para ser asociados a tus futuras consultas médicas.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-emerald-900 hover:bg-emerald-950 text-white font-semibold py-3.5 rounded-2xl transition-all shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 disabled:opacity-50 mt-4 text-sm"
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Guardando datos...
                            </>
                        ) : (
                            'Guardar Perfil'
                        )}
                    </button>
                </form>
            </div>
        </main>
    )
}