'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
    Menu,
    Bell,
    User,
    CheckCircle2,
    Clock,
    Sparkles,
    ShieldCheck,
} from 'lucide-react'

function MatchContent() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const type = searchParams.get('type') || 'psychologist'
    const modality = searchParams.get('modality') || 'video'

    // Estados de animación progresiva del motor
    const [step, setStep] = useState(1)

    useEffect(() => {
        const timer1 = setTimeout(() => setStep(2), 1500)
        const timer2 = setTimeout(() => setStep(3), 3000)

        // Simulación de encuentro exitoso
        const timer3 = setTimeout(() => {
            // Redirección a la sala de consulta o llamada
            router.push(`/session/room?type=${type}&modality=${modality}`)
        }, 5000)

        return () => {
            clearTimeout(timer1)
            clearTimeout(timer2)
            clearTimeout(timer3)
        }
    }, [router, type, modality])

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 p-0 sm:p-6 md:p-8 font-sans flex justify-center items-stretch sm:items-center">
            <div className="w-full min-h-full sm:min-h-0 sm:max-w-md md:max-w-3xl bg-white border-0 sm:border border-slate-200/80 rounded-none sm:rounded-[40px] p-4 sm:p-8 shadow-none sm:shadow-xl space-y-6 flex flex-col justify-between">

                {/* Cabecera Superior */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 shrink-0">
                    <button className="p-2 text-slate-600 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors">
                        <Menu className="w-5 h-5 md:w-6 md:h-6" />
                    </button>

                    <span className="text-xs sm:text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Buscando profesional...
                    </span>

                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
                        <Bell className="w-5 h-5" />
                    </button>
                </div>

                {/* Layout Principal: Mobile 1 Columna / Desktop 2 Columnas */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">

                    {/* Columna Izquierda: Radar Animado */}
                    <div className="md:col-span-6 flex flex-col items-center justify-center py-4">
                        <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-emerald-50/50 border border-emerald-100 flex items-center justify-center overflow-hidden">
                            {/* Anillos concéntricos */}
                            <div className="absolute w-36 h-36 rounded-full border border-emerald-200/60" />
                            <div className="absolute w-24 h-24 rounded-full border border-emerald-200/80" />

                            {/* Barrido del Radar con cónica CSS */}
                            <div
                                className="absolute inset-0 rounded-full animate-spin"
                                style={{
                                    animationDuration: '3s',
                                    background:
                                        'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(6, 78, 59, 0.25) 360deg)',
                                }}
                            />

                            {/* Centro / Usuario */}
                            <div className="w-12 h-12 rounded-full bg-emerald-900 flex items-center justify-center text-white z-10 shadow-lg shadow-emerald-900/20">
                                <User className="w-6 h-6" />
                            </div>
                        </div>

                        <p className="text-center text-xs sm:text-sm font-semibold text-slate-700 max-w-xs mt-4">
                            El Motor de Disponibilidad Inteligente está buscando al profesional ideal para vos.
                        </p>
                    </div>

                    {/* Columna Derecha: Checklist de Verificación y Tiempo */}
                    <div className="md:col-span-6 space-y-4">

                        {/* Tarjeta de Estados */}
                        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3.5">
                            <div className="flex items-center gap-3">
                                <CheckCircle2
                                    className={`w-5 h-5 transition-colors ${step >= 1 ? 'text-emerald-900' : 'text-slate-300'
                                        }`}
                                />
                                <span className="text-xs sm:text-sm font-bold text-slate-800">
                                    Analizando disponibilidad
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle2
                                    className={`w-5 h-5 transition-colors ${step >= 2 ? 'text-emerald-900' : 'text-slate-300'
                                        }`}
                                />
                                <span className="text-xs sm:text-sm font-bold text-slate-800">
                                    Verificando especialidad
                                </span>
                            </div>

                            <div className="flex items-center gap-3">
                                <CheckCircle2
                                    className={`w-5 h-5 transition-colors ${step >= 3 ? 'text-emerald-900' : 'text-slate-300'
                                        }`}
                                />
                                <span className="text-xs sm:text-sm font-bold text-slate-800">
                                    Priorizando tu bienestar
                                </span>
                            </div>
                        </div>

                        {/* Banner de Tiempo Estimado */}
                        <div className="p-3.5 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full border border-emerald-900/30 flex items-center justify-center text-emerald-900 shrink-0">
                                <Clock className="w-4 h-4" />
                            </div>
                            <p className="text-xs font-semibold text-emerald-950 leading-tight">
                                Te conectaremos en menos de 60 segundos.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </main>
    )
}

export default function MatchPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-slate-50">
                    <div className="w-10 h-10 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin" />
                </div>
            }
        >
            <MatchContent />
        </Suspense>
    )
}