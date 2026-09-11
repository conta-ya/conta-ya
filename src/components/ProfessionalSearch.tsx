'use client'

import { useState } from 'react'
import { Search, UserCheck, Circle } from 'lucide-react'

interface Professional {
    id: string
    specialty: string
    hourlyRate: any
    isOnline: boolean
    profile: {
        fullName: string | null
        email: string
    }
}

export default function ProfessionalSearch({
    initialProfessionals,
}: {
    initialProfessionals: Professional[]
}) {
    const [searchTerm, setSearchTerm] = useState('')
    const [professionals] = useState<Professional[]>(initialProfessionals)

    const filtered = professionals.filter((p) =>
        p.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.profile.fullName && p.profile.fullName.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="space-y-6">
            {/* Buscador */}
            <div className="relative max-w-md">
                <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                    type="text"
                    placeholder="Buscar por especialidad o nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-teal-500 transition-colors"
                />
            </div>

            {/* Listado de Tarjetas */}
            {filtered.length === 0 ? (
                <div className="text-center py-12 bg-slate-900/40 rounded-2xl border border-slate-800">
                    <p className="text-slate-400 text-sm">No se encontraron profesionales disponibles.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((pro) => (
                        <div
                            key={pro.id}
                            className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition-all"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                                        {pro.specialty}
                                    </span>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                        <Circle
                                            className={`w-2.5 h-2.5 fill-current ${pro.isOnline ? 'text-emerald-500' : 'text-slate-600'
                                                }`}
                                        />
                                        {pro.isOnline ? 'En línea' : 'Sin conexión'}
                                    </div>
                                </div>

                                <h3 className="text-lg font-bold text-slate-100 mb-1">
                                    {pro.profile.fullName || 'Profesional de Salud'}
                                </h3>
                                <p className="text-xs text-slate-400 flex items-center gap-1 mb-4">
                                    <UserCheck className="w-3.5 h-3.5 text-teal-400" /> Matrícula Verificada
                                </p>
                            </div>

                            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between mt-4">
                                <div>
                                    <span className="text-xs text-slate-400 block">Consulta (30 min)</span>
                                    <span className="text-lg font-bold text-white">${Number(pro.hourlyRate)} ARS</span>
                                </div>
                                <button className="bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all">
                                    Solicitar Turno
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}