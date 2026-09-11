'use client'

import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Info, User, Heart, Star, GraduationCap, Sparkles, ChevronDown } from 'lucide-react'

const MapReal = dynamic(() => import('./map-real'), {
    ssr: false,
    loading: () => (
        <div className="w-full h-full bg-slate-100 flex items-center justify-center text-xs text-slate-400">
            Cargando mapa de Santiago del Estero...
        </div>
    ),
})

const MOCK_PROFESSIONALS = [
    { id: '1', name: 'Lic. María Gómez', specialty: 'Psicóloga', type: 'psychologist', lat: -27.785, lng: -64.268 },
    { id: '2', name: 'Lic. Juan Pérez', specialty: 'Psicólogo', type: 'psychologist', lat: -27.78, lng: -64.26 },
    { id: '3', name: 'Carlos Ruíz', specialty: 'Acompañante Terapéutico', type: 'therapist', lat: -27.79, lng: -64.27 },
    { id: '4', name: 'Ana Luz', specialty: 'Coach Ontológico', type: 'coach', lat: -27.778, lng: -64.255 },
    { id: '5', name: 'Sofi Martínez', specialty: 'Estudiante Avanzado', type: 'student', lat: -27.788, lng: -64.262 },
]

export default function ProfessionalsMapView() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const selectedType = searchParams.get('type') || 'psychologist'

    const filteredProfessionals = MOCK_PROFESSIONALS.filter(
        (p) => p.type === selectedType
    )

    return (
        <main className="min-h-screen bg-slate-50 text-slate-900 p-2 sm:p-6 font-sans flex justify-center items-center">
            <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-[32px] sm:rounded-[40px] p-4 sm:p-5 shadow-xl space-y-3.5 flex flex-col justify-between">

                {/* Encabezado compacto */}
                <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/dashboard"
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>

                        <div className="flex items-center gap-1 font-bold text-slate-900 text-base">
                            <span>Santiago del Estero</span>
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                        </div>

                        <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-full">
                            <Info className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="text-center">
                        <p className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                            Disponibilidad en tiempo real
                        </p>
                        <p className="text-xs font-semibold text-slate-700">en tu ciudad</p>
                    </div>
                </div>

                {/* 🎯 Contenedor del Mapa ampliado en vertical (h-[360px] sm:h-[400px]) */}
                <div className="w-full h-[360px] sm:h-[400px] rounded-2xl sm:rounded-3xl overflow-hidden relative border border-slate-200 shadow-inner flex bg-slate-100">
                    <MapReal professionals={filteredProfessionals} />
                </div>

                {/* Botones de Categorías */}
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                    <button
                        onClick={() => router.push('/professionals?type=psychologist')}
                        className={`p-2 rounded-2xl border text-center transition-all flex flex-col items-center justify-between h-22 sm:h-26 ${selectedType === 'psychologist'
                            ? 'border-emerald-900 bg-emerald-50/40 ring-2 ring-emerald-900/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                    >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-900">
                            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">Psicólogos</span>
                        <span className="text-sm sm:text-base font-black text-emerald-900">12</span>
                    </button>

                    <button
                        onClick={() => router.push('/professionals?type=therapist')}
                        className={`p-2 rounded-2xl border text-center transition-all flex flex-col items-center justify-between h-22 sm:h-26 ${selectedType === 'therapist'
                            ? 'border-purple-600 bg-purple-50/40 ring-2 ring-purple-600/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                    >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-purple-50 flex items-center justify-center text-purple-700">
                            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">Acompañantes</span>
                        <span className="text-sm sm:text-base font-black text-purple-700">8</span>
                    </button>

                    <button
                        onClick={() => router.push('/professionals?type=coach')}
                        className={`p-2 rounded-2xl border text-center transition-all flex flex-col items-center justify-between h-22 sm:h-26 ${selectedType === 'coach'
                            ? 'border-amber-600 bg-amber-50/40 ring-2 ring-amber-600/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                    >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">Coaches</span>
                        <span className="text-sm sm:text-base font-black text-amber-600">6</span>
                    </button>

                    <button
                        onClick={() => router.push('/professionals?type=student')}
                        className={`p-2 rounded-2xl border text-center transition-all flex flex-col items-center justify-between h-22 sm:h-26 ${selectedType === 'student'
                            ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20'
                            : 'border-slate-200 bg-white hover:border-slate-300'
                            }`}
                    >
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>
                        <span className="text-[10px] font-semibold text-slate-700 leading-tight">Estudiantes</span>
                        <span className="text-sm sm:text-base font-black text-blue-600">15</span>
                    </button>
                </div>

                {/* Banner Informativo */}
                <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2.5">
                    <Sparkles className="w-4 h-4 text-emerald-900 shrink-0" />
                    <p className="text-[11px] font-medium text-emerald-950 leading-tight">
                        El motor asignará automáticamente al profesional más adecuado para vos.
                    </p>
                </div>

            </div>
        </main>
    )
}