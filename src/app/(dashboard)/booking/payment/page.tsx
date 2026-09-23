'use client'

import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
    ArrowLeft,
    CreditCard,
    Building2,
    Lock,
    Copy,
    Check,
    Video,
    PhoneCall,
    User,
    ShieldCheck,
} from 'lucide-react'

function PaymentContent() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const type = searchParams.get('type') || 'psychologist'
    const modality = searchParams.get('modality') || 'video'

    const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer'>('transfer')
    const [copiedAlias, setCopiedAlias] = useState(false)
    const [isProcessing, setIsProcessing] = useState(false)

    // Datos dinámicos según el tipo de profesional
    const DETAILS: Record<
        string,
        { title: string; subtitle: string; price: string }
    > = {
        psychologist: { title: 'Psicólogo/a', subtitle: 'Micro sesión (30 min)', price: '$35.000' },
        therapist: { title: 'Acompañante Terapéutico', subtitle: 'Micro sesión (30 min)', price: '$25.000' },
        coach: { title: 'Coach Ontológico', subtitle: 'Micro sesión (30 min)', price: '$28.000' },
        student: { title: 'Estudiante Avanzado', subtitle: 'Micro sesión (30 min)', price: '$18.000' },
    }

    const currentDetail = DETAILS[type] || DETAILS.psychologist

    const handleCopyAlias = () => {
        navigator.clipboard.writeText('CONTA.YA.BANCO')
        setCopiedAlias(true)
        setTimeout(() => setCopiedAlias(false), 2000)
    }

    const handleConfirmPayment = () => {
        setIsProcessing(true)
        // Redirección al emparejamiento / radar en tiempo real
        setTimeout(() => {
            router.push(`/booking/match?type=${type}&modality=${modality}`)
        }, 1200)
    }

    return (
        <main className="min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900 p-0 sm:p-6 md:p-8 font-sans flex justify-center items-stretch sm:items-center">
            <div className="w-full min-h-full sm:min-h-0 sm:max-w-4xl bg-white border-0 sm:border border-slate-200/80 rounded-none sm:rounded-[40px] p-4 sm:p-8 md:p-10 shadow-none sm:shadow-xl space-y-6 md:space-y-8 flex flex-col justify-between">

                {/* Encabezado */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4 shrink-0">
                    <div className="flex items-center gap-3">
                        <Link
                            href={`/booking/configure?type=${type}`}
                            className="p-1.5 sm:p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
                        </Link>
                        <div>
                            <h1 className="text-lg sm:text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                                Pago y confirmación
                            </h1>
                            <p className="hidden md:block text-slate-500 text-xs mt-0.5">
                                Realizá el pago para activar la búsqueda del profesional.
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold">
                        <ShieldCheck className="w-4 h-4 text-emerald-900" /> Transacción Encriptada
                    </div>
                </div>

                {/* Grid Adaptable: Mobile 1 Columna / Desktop 2 Columnas */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-start flex-1">

                    {/* Columna Izquierda: Métodos de Pago */}
                    <div className="md:col-span-7 space-y-5">
                        <label className="text-[11px] sm:text-xs font-bold text-slate-800 uppercase tracking-wider block">
                            ¿Cómo querés pagar?
                        </label>

                        <div className="space-y-3">
                            {/* Opción 1: Tarjeta */}
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('card')}
                                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer text-left ${paymentMethod === 'card'
                                        ? 'border-emerald-900 bg-emerald-50/40 ring-1 ring-emerald-900/20 shadow-sm'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-900 shrink-0">
                                        <CreditCard className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                                            Tarjeta de crédito / débito
                                        </h3>
                                        <p className="text-[11px] sm:text-xs text-slate-500">
                                            Pagá de forma segura con tu tarjeta.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === 'card'
                                            ? 'border-emerald-900 bg-emerald-900'
                                            : 'border-slate-300'
                                        }`}
                                >
                                    {paymentMethod === 'card' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                                </div>
                            </button>

                            {/* Opción 2: Transferencia Bancaria */}
                            <button
                                type="button"
                                onClick={() => setPaymentMethod('transfer')}
                                className={`w-full p-4 rounded-2xl border-2 transition-all flex items-center justify-between cursor-pointer text-left ${paymentMethod === 'transfer'
                                        ? 'border-emerald-900 bg-emerald-50/40 ring-1 ring-emerald-900/20 shadow-sm'
                                        : 'border-slate-200 bg-white hover:border-slate-300'
                                    }`}
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-900 shrink-0">
                                        <Building2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                                            Transferencia bancaria / Alias
                                        </h3>
                                        <p className="text-[11px] sm:text-xs text-slate-500">
                                            Usá tu banco o app de pago.
                                        </p>
                                    </div>
                                </div>

                                <div
                                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${paymentMethod === 'transfer'
                                            ? 'border-emerald-900 bg-emerald-900'
                                            : 'border-slate-300'
                                        }`}
                                >
                                    {paymentMethod === 'transfer' && <Check className="w-3 h-3 text-white stroke-[3]" />}
                                </div>
                            </button>
                        </div>

                        {/* Caja desplegable de Alias para Transferencia */}
                        {paymentMethod === 'transfer' && (
                            <div className="p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-center space-y-2 relative transition-all">
                                <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                                    Alias de CONTA YA!
                                </span>

                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-base sm:text-xl font-black text-emerald-950 tracking-wide">
                                        CONTA.YA.BANCO
                                    </span>
                                    <button
                                        onClick={handleCopyAlias}
                                        className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-900 transition-colors cursor-pointer"
                                        title="Copiar Alias"
                                    >
                                        {copiedAlias ? <Check className="w-4 h-4 text-emerald-900" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>

                                <p className="text-xs font-medium text-slate-600">
                                    Cuenta empresarial oficial de CONTA YA!
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Columna Derecha: Resumen de Solicitud y Acción */}
                    <div className="md:col-span-5 space-y-5 bg-slate-50/70 border border-slate-200/80 p-4 sm:p-6 rounded-2xl sm:rounded-3xl flex flex-col justify-between">
                        <div className="space-y-4">
                            <h2 className="text-[11px] sm:text-xs font-extrabold text-slate-800 uppercase tracking-wider">
                                Resumen de tu solicitud
                            </h2>

                            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-900 shrink-0">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                                            {currentDetail.title}
                                        </h4>
                                        <span className="text-[11px] sm:text-xs text-slate-500">
                                            {currentDetail.subtitle}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs sm:text-sm font-bold">
                                    <div className="flex items-center gap-2 text-slate-700">
                                        {modality === 'video' ? (
                                            <Video className="w-4 h-4 text-emerald-900" />
                                        ) : (
                                            <PhoneCall className="w-4 h-4 text-emerald-900" />
                                        )}
                                        <span className="capitalize">
                                            {modality === 'video' ? 'Videollamada' : 'Llamada de voz'}
                                        </span>
                                    </div>

                                    <span className="text-emerald-950 font-black text-sm sm:text-base">
                                        {currentDetail.price}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 pt-2">
                            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
                                <Lock className="w-3.5 h-3.5 text-emerald-900" />
                                <span>Pago 100% seguro</span>
                            </div>

                            <button
                                onClick={handleConfirmPayment}
                                disabled={isProcessing}
                                className="w-full bg-emerald-900 hover:bg-emerald-950 text-white font-bold py-3.5 sm:py-4 rounded-2xl transition-all shadow-md shadow-emerald-900/10 flex items-center justify-center gap-2 text-xs sm:text-base cursor-pointer disabled:opacity-50 hover:scale-[1.01]"
                            >
                                {isProcessing ? 'Procesando pago...' : 'Confirmar pago'}
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </main>
    )
}

export default function BookingPaymentPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-slate-50">
                    <div className="w-10 h-10 border-4 border-emerald-900 border-t-transparent rounded-full animate-spin" />
                </div>
            }
        >
            <PaymentContent />
        </Suspense>
    )
}