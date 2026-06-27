import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getContent, saveContent, SiteContent } from '@/lib/content'

export async function GET() {
  try {
    const content = await getContent()
    return NextResponse.json(content)
  } catch (error) {
    return NextResponse.json({ error: 'Error al leer contenido' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const body: SiteContent = await req.json()
    await saveContent(body)
    return NextResponse.json({ ok: true })
  } catch (error) {
    return NextResponse.json({ error: 'Error al guardar contenido' }, { status: 500 })
  }
}
