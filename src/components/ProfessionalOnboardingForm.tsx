'use client'

import { useActionState, useEffect } from 'react'
import { completeProfessionalOnboarding, OnboardingState } from '@/app/actions/onboarding'
import { useRouter } from 'next/navigation'

const initialState: OnboardingState = {}

export default function ProfessionalOnboardingForm() {
    const [state, formAction, isPending] = useActionState(
        completeProfessionalOnboarding,
        initialState
    )
    const router = useRouter()

    useEffect(() => {
        if (state.success) {
            router.push('/dashboard')
        }
    }, [state.success, router])

    return (
        <form action={formAction} className="space-y-4 max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Perfil Profesional</h2>
                <p className="text-sm text-gray-600">Completa tus datos legales para empezar a atender.</p>
            </div>

            {state.error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-md">
                    {state.error}
                </div>
            )}

            <div>
                <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">Especialidad</label>
                <input
                    type="text"
                    id="specialty"
                    name="specialty"
                    required
                    placeholder="Ej: Psicología Clínica, Psiquiatría"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
                />
            </div>

            <div>
                <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">Colegio Profesional / Entidad Emisora</label>
                <input
                    type="text"
                    id="collegeName"
                    name="collegeName"
                    required
                    placeholder="Ej: Colegio de Psicólogos de Santiago del Estero"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
                />
            </div>

            <div>
                <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">Número de Matrícula</label>
                <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    required
                    placeholder="Ej: MP-9842"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
                />
            </div>

            <div>
                <label htmlFor="documentId" className="block text-sm font-medium text-gray-700">DNI / CUIT</label>
                <input
                    type="text"
                    id="documentId"
                    name="documentId"
                    required
                    placeholder="Ej: 20-35123456-9"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
                />
            </div>

            <div>
                <label htmlFor="hourlyRate" className="block text-sm font-medium text-gray-700">Precio por Consulta (ARS)</label>
                <input
                    type="number"
                    id="hourlyRate"
                    name="hourlyRate"
                    step="0.01"
                    min="1"
                    required
                    placeholder="Ej: 15000"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
                />
            </div>

            <button
                type="submit"
                disabled={isPending}
                className="w-full py-2.5 px-4 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
            >
                {isPending ? 'Guardando...' : 'Registrar Perfil'}
            </button>
        </form>
    )
}