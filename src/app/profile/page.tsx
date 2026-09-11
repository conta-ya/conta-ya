'use client'

import { useActionState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { updatePatientProfile, PatientProfileState } from '@/app/actions/patient-profile'
import { User, ShieldCheck, ArrowLeft, Loader2, Phone, CreditCard, HeartPulse, Calendar, Users, Stethoscope } from 'lucide-react'
import Link from 'next/link'

const initialState: PatientProfileState = {}

export default function PatientProfilePage() {
    const router = useRouter()
    const [state, formAction, isPending] = useActionState(updatePatientProfile, initialState)

    useEffect(() => {
        if (state.success) {
            router.push('/dashboard')
            router.refresh()
        }
    }, [state.success, router])

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 flex items-center justify-center p-6">
            <div className="max-w-xl w-full bg-slate-900/60 border border-slate-800 rounded-3xl p-8 shadow-2xl relative">
                <div className="flex items-center justify-between mb-6">
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Volver al Panel
                    </Link>

                    {/* Opción para cambiar a perfil Profesional */}
                    <Link
                        href="/onboarding/professional"
                        className="inline-flex items-center gap-1.5 text-xs text-teal-400 hover:text-teal-300 font-medium transition-colors"
                    >
                        <Stethoscope className="w-3.5 h-3.5" /> ¿Eres profesional? Registra tu matrícula
                    </Link>
                </div>

                <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
                        <User className="w-5 h-5" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Completar Datos Personales</h1>
                </div>

                <p className="text-slate-400 text-sm mb-6">
                    Ingresa tus datos personales y de contacto para agilizar la atención con tus profesionales.
                </p>

                {state.error && (
                    <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl">
                        {state.error}
                    </div>
                )}

                <form action={formAction} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                                <CreditCard className="w-3.5 h-3.5 text-teal-400" />
                                DNI / Documento *
                            </label>
                            <input
                                type="text"
                                name="documentId"
                                required
                                placeholder="Ej: 38123456"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                                <Phone className="w-3.5 h-3.5 text-teal-400" />
                                Teléfono (WhatsApp) *
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                placeholder="Ej: +54 385 1234567"
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                                <Users className="w-3.5 h-3.5 text-teal-400" />
                                Género *
                            </label>
                            <select
                                name="gender"
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-teal-500 transition-colors"
                            >
                                <option value="">Selecciona...</option>
                                <option value="MASCULINO">Masculino</option>
                                <option value="FEMENINO">Femenino</option>
                                <option value="OTRO">Otro / Prefiero no decir</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                                Fecha de Nacimiento *
                            </label>
                            <input
                                type="date"
                                name="birthday"
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-teal-500 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                            <HeartPulse className="w-3.5 h-3.5 text-teal-400" />
                            Obra Social o Prepaga (Opcional)
                        </label>
                        <input
                            type="text"
                            name="healthInsurance"
                            placeholder="Ej: OSDE, Swiss Medical, Particular..."
                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-teal-500 transition-colors"
                        />
                    </div>

                    <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-800/80 flex items-start gap-3 mt-2">
                        <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Tus datos personales están protegidos y resguardados para ser asociados a tus futuras consultas médicas.
                        </p>
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold py-3 rounded-xl transition-all shadow-lg shadow-teal-500/10 flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
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