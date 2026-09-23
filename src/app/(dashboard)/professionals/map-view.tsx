'use client'

import dynamic from 'next/dynamic'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Info, User, Heart, Star, GraduationCap, Sparkles, ChevronDown, MapPin } from 'lucide-react'

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

    const handleSelectCategory = (type: string) => {
        router.push(`/booking/configure?type=${type}`)
    }

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 p-0 sm:p-6 font-sans flex justify-center items-stretch sm:items-center">
            {/* Contenedor: W-FULL en mobile sin márgenes (rounded-none en mobile, rounded-[40px] en sm+) */}
            <div className="w-full min-h-full sm:min-h-0 sm:max-w-5xl bg-white border-0 sm:border border-slate-200/80 rounded-none sm:rounded-[40px] p-4 sm:p-8 shadow-none sm:shadow-xl space-y-4 md:space-y-6 flex flex-col justify-between">

                {/* Encabezado */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 md:pb-4 shrink-0">
                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard"
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </Link>

                        <div>
                            <div className="flex items-center gap-1.5 font-black text-slate-900 text-base md:text-xl">
                                <MapPin className="w-4 h-4 text-emerald-900" />
                                <span>Santiago del Estero</span>
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                            </div>
                            <p className="text-[11px] md:text-xs font-medium text-slate-500">
                                Disponibilidad en tiempo real en tu ciudad
                            </p>
                        </div>
                    </div>

                    <button className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-50">
                        <Info className="w-5 h-5" />
                    </button>
                </div>

                {/* Grid Responsivo: Flexibel 1 Columna Full en Mobile / 2 Columnas en Desktop */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-stretch flex-1">

                    {/* Columna Mapa: Crece para ocupar el alto disponible en Mobile */}
                    <div className="md:col-span-7 flex flex-col flex-1 min-h-[300px] sm:min-h-[380px] md:min-h-[480px]">
                        <div className="w-full h-full rounded-2xl md:rounded-3xl overflow-hidden relative border border-slate-200 shadow-inner bg-slate-100 flex-1">
                            <MapReal professionals={filteredProfessionals} />
                        </div>
                    </div>

                    {/* Columna Derecha / Inferior: Controles de Selección */}
                    <div className="md:col-span-5 flex flex-col justify-between space-y-3 sm:space-y-4 shrink-0">

                        <div className="space-y-2.5">
                            <label className="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider block">
                                Seleccioná el tipo de atención
                            </label>

                            <div className="grid grid-cols-4 md:grid-cols-2 gap-1.5 sm:gap-3">
                                <button
                                    onClick={() => handleSelectCategory('psychologist')}
                                    className={`p-2 sm:p-4 rounded-2xl border text-center md:text-left transition-all flex flex-col md:flex-row items-center justify-between h-22 sm:h-auto cursor-pointer ${selectedType === 'psychologist'
                                        ? 'border-emerald-900 bg-emerald-50/40 ring-2 ring-emerald-900/20'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                        }`}
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-1.5 sm:gap-3">
                                        <div className="w-7 h-7 md:w-9 md:h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-900 shrink-0">
                                            <User className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </div>
                                        <span className="text-[10px] md:text-sm font-bold text-slate-800 leading-tight">
                                            Psicólogos
                                        </span>
                                    </div>
                                    <span className="text-xs sm:text-lg font-black text-emerald-900">12</span>
                                </button>

                                <button
                                    onClick={() => handleSelectCategory('therapist')}
                                    className={`p-2 sm:p-4 rounded-2xl border text-center md:text-left transition-all flex flex-col md:flex-row items-center justify-between h-22 sm:h-auto cursor-pointer ${selectedType === 'therapist'
                                        ? 'border-purple-600 bg-purple-50/40 ring-2 ring-purple-600/20'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                        }`}
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-1.5 sm:gap-3">
                                        <div className="w-7 h-7 md:w-9 md:h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-700 shrink-0">
                                            <Heart className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </div>
                                        <span className="text-[10px] md:text-sm font-bold text-slate-800 leading-tight">
                                            Acompañantes
                                        </span>
                                    </div>
                                    <span className="text-xs sm:text-lg font-black text-purple-700">8</span>
                                </button>

                                <button
                                    onClick={() => handleSelectCategory('coach')}
                                    className={`p-2 sm:p-4 rounded-2xl border text-center md:text-left transition-all flex flex-col md:flex-row items-center justify-between h-22 sm:h-auto cursor-pointer ${selectedType === 'coach'
                                        ? 'border-amber-600 bg-amber-50/40 ring-2 ring-amber-600/20'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                        }`}
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-1.5 sm:gap-3">
                                        <div className="w-7 h-7 md:w-9 md:h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 shrink-0">
                                            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </div>
                                        <span className="text-[10px] md:text-sm font-bold text-slate-800 leading-tight">
                                            Coaches
                                        </span>
                                    </div>
                                    <span className="text-xs sm:text-lg font-black text-amber-600">6</span>
                                </button>

                                <button
                                    onClick={() => handleSelectCategory('student')}
                                    className={`p-2 sm:p-4 rounded-2xl border text-center md:text-left transition-all flex flex-col items-center justify-between h-22 sm:h-auto cursor-pointer ${selectedType === 'student'
                                        ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-600/20'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                        }`}
                                >
                                    <div className="flex flex-col md:flex-row items-center gap-1.5 sm:gap-3">
                                        <div className="w-7 h-7 md:w-9 md:h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                                            <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                                        </div>
                                        <span className="text-[10px] md:text-sm font-bold text-slate-800 leading-tight">
                                            Estudiantes
                                        </span>
                                    </div>
                                    <span className="text-xs sm:text-lg font-black text-blue-600">15</span>
                                </button>
                            </div>
                        </div>

                        {/* Banner Informativo */}
                        <div className="p-3 sm:p-4 rounded-2xl bg-emerald-50/70 border border-emerald-100 flex items-start gap-2.5 sm:gap-3">
                            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-900 shrink-0 mt-0.5" />
                            <p className="text-[11px] sm:text-xs font-medium text-emerald-950 leading-snug">
                                El motor geolocalizado asignará automáticamente al profesional más adecuado para vos.
                            </p>
                        </div>

                    </div>

                </div>

            </div>
        </main>
    )
}