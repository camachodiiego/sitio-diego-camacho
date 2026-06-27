import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) return NextResponse.json({ error: 'No se recibio archivo' }, { status: 400 })

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type)) return NextResponse.json({ error: 'Tipo no permitido' }, { status: 400 })
    if (file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'Archivo muy grande' }, { status: 400 })

    const { getStore } = await import('@netlify/blobs')
    const store = getStore('uploads')
    const ext = file.name.split('.').pop()
    const filename = Date.now() + '-' + Math.random().toString(36).slice(2) + '.' + ext
    const arrayBuffer = await file.arrayBuffer()

    await store.set(filename, arrayBuffer, {
      metadata: { contentType: file.type, originalName: file.name, uploadedAt: new Date().toISOString() },
    })

    return NextResponse.json({ url: '/api/upload/' + filename, filename })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Error al subir archivo' }, { status: 500 })
  }
}