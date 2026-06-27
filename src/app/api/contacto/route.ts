import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { nombre, email, mensaje } = await req.json()

    if (!nombre || !email || !mensaje) {
      return NextResponse.json({ error: 'Todos los campos son requeridos' }, { status: 400 })
    }

    // Store message in Netlify Blobs
    const { getStore } = await import('@netlify/blobs')
    const store = getStore('mensajes')
    const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`
    await store.set(id, JSON.stringify({
      id, nombre, email, mensaje,
      fecha: new Date().toISOString(),
      leido: false,
    }))

    return NextResponse.json({ ok: true, message: 'Mensaje enviado correctamente' })
  } catch (error) {
    return NextResponse.json({ error: 'Error al enviar mensaje' }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { getStore } = await import('@netlify/blobs')
    const store = getStore('mensajes')
    const { blobs } = await store.list()

    const mensajes = await Promise.all(
      blobs.map(async (b) => {
        const raw = await store.get(b.key, { type: 'text' })
        return raw ? JSON.parse(raw) : null
      })
    )

    return NextResponse.json(mensajes.filter(Boolean).sort((a, b) =>
      new Date(b.fecha).getTime() - new Date(a.fecha).getTime()
    ))
  } catch {
    return NextResponse.json([])
  }
}
