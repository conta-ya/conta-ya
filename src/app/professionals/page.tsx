import { getVerifiedProfessionals } from '@/app/actions/get-professionals'
import ProfessionalSearch from '@/components/ProfessionalSearch'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default async function ProfessionalsPage() {
    const { professionals } = await getVerifiedProfessionals()

    return (
        <main className="min-h-screen bg-slate-950 text-slate-50 p-6 md:p-12">
            <div className="max-w-6xl mx-auto space-y-8">
                <div>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-slate-200 mb-4 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Volver al Panel
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight">Especialistas Disponibles</h1>
                    <p className="text-slate-400 text-sm mt-1">
                        Encuentra y conecta con profesionales verificados en tiempo real.
                    </p>
                </div>

                <ProfessionalSearch initialProfessionals={professionals as any} />
            </div>
        </main>
    )
}