import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config = {
    matcher: [
        // Omitir archivos estáticos y rutas internas de Next.js
        '/((?!_next|[^?]*\\.[\\w]+$ opacity).*)',
        // Ejecutar el middleware para rutas de la app y llamadas de API
        '/(api|trpc)(.*)',
    ],
}