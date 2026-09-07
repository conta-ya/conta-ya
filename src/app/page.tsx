import Link from 'next/link'
import { Shield, Video, Calendar, ArrowRight, HeartPulse, CheckCircle2, Star } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-teal-500 selection:text-slate-950">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500 flex items-center justify-center shadow-lg shadow-teal-500/20">
              <HeartPulse className="w-6 h-6 text-slate-950" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Conta<span className="text-teal-400">YA!</span>
            </span>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm text-slate-300">
            <a href="#como-funciona" className="hover:text-teal-400 transition-colors">Cómo funciona</a>
            <a href="#beneficios" className="hover:text-teal-400 transition-colors">Beneficios</a>
            <a href="#profesionales" className="hover:text-teal-400 transition-colors">Profesionales</a>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/sign-in"
              className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2 transition-colors"
            >
              Ingresar
            </Link>
            <Link
              href="/sign-up"
              className="text-sm font-medium bg-teal-500 hover:bg-teal-400 text-slate-950 px-5 py-2.5 rounded-xl shadow-lg shadow-teal-500/10 transition-all hover:scale-[1.02]"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-950/30 via-slate-950 to-slate-950 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-8 tracking-wide uppercase">
            <Shield className="w-3.5 h-3.5" /> Sesiones 100% confidenciales y seguras
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto mb-8 leading-[1.1]">
            Tu bienestar mental, <br />
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              a un solo clic de distancia.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-normal">
            Conectamos profesionales de la salud mental con pacientes mediante una plataforma segura, reservas instantáneas y pagos protegidos en garantía.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/sign-up"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-teal-500 hover:bg-teal-400 text-slate-950 font-semibold px-8 py-4 rounded-xl shadow-xl shadow-teal-500/20 transition-all hover:scale-[1.02]"
            >
              Encontrar un terapeuta <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sign-up?role=professional"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold px-8 py-4 rounded-xl border border-slate-800 transition-all"
            >
              Soy profesional
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="como-funciona" className="py-24 border-t border-slate-900 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Diseñado para tu total tranquilidad</h2>
            <p className="text-slate-400">Un ecosistema pensado para eliminar fricciones y cuidar cada detalle de tu terapia.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6">
                <Calendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Búsqueda y Reserva Rápida</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Filtra especialistas por disponibilidad, especialidad y arancel. Reserva tu turno de forma inmediata en el horario que mejor se adapte a ti.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Pagos en Escrow Protegidos</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tu dinero queda resguardado de forma segura hasta que la sesión se complete con éxito, garantizando confianza tanto para pacientes como profesionales.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 mb-6">
                <Video className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Videollamada Integrada</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Accede a tu sala de consulta virtual de alta calidad directamente desde el navegador, sin necesidad de instalar aplicaciones externas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Conta YA! Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}