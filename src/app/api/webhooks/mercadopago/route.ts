import { NextResponse } from 'next/server'

export async function POST() {
    return NextResponse.json({ message: 'Webhook Mercado Pago no implementado aún' }, { status: 200 })
}