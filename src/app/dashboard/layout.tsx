import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import { LayoutDashboard, Search, User } from 'lucide-react'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
            {/* Navbar Superior del Dashboard */}
            <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

                    {/* Logo y Nombre App */}
                    <div className="flex items-center gap-8">
                        <Link href="/dashboard" className="flex items-center gap-2 font-bold text-lg tracking-tight text-slate-900">
                            <div className="w-8 h-8 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center text-teal-600">
                                💚
                            </div>
                            <span>Conta<span className="text-teal-600">YA!</span></span>
                        </Link>

                        {/* Enlaces de Navegación */}
                        <nav className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-600">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            >
                                <LayoutDashboard className="w-4 h-4 text-teal-600" /> Panel
                            </Link>
                            <Link
                                href="/professionals"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            >
                                <Search className="w-4 h-4 text-teal-600" /> Buscar Especialistas
                            </Link>
                            <Link
                                href="/profile"
                                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:text-slate-900 hover:bg-slate-100 transition-colors"
                            >
                                <User className="w-4 h-4 text-teal-600" /> Mi Perfil
                            </Link>
                        </nav>
                    </div>

                    {/* Menú de Usuario y Logout (Clerk) */}
                    <div className="flex items-center gap-4">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: 'w-9 h-9 border border-teal-600/30 shadow-sm',
                                },
                            }}
                        />
                    </div>
                </div>
            </header>

            {/* Contenido Dinámico de las Páginas */}
            <div className="flex-1 bg-slate-50">
                {children}
            </div>
        </div>
    )
}