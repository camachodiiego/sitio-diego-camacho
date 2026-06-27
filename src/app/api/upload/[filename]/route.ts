import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const { getStore } = await import('@netlify/blobs')
    const store = getStore('uploads')

    const blob = await store.getWithMetadata(params.filename)
    if (!blob) {
      return NextResponse.json({ error: 'Imagen no encontrada' }, { status: 404 })
    }

    const { data, metadata } = blob
    const contentType = (metadata?.contentType as string) || 'image/jpeg'

    return new NextResponse(data as any, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch (error) {
    return NextResponse.json({ error: 'Error al servir imagen' }, { status: 500 })
  }
}
