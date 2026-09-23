import { Suspense } from 'react'
import ProfessionalsMapView from './map-view'

export default function ProfessionalsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-slate-50">
                    <div className="w-10 h-10 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin" />
                </div>
            }
        >
            <ProfessionalsMapView />
        </Suspense>
    )
}