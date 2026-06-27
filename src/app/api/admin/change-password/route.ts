import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import bcrypt from 'bcryptjs'

const SITE_ID     = '728f2122-3eb2-4ed5-b925-ea2c3e7c1f26'
const ACCOUNT_ID  = '6a39ad141556fa985365ecd6'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }

  const { currentPassword, newPassword } = await req.json()

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: 'Faltan campos' }, { status: 400 })
  }
  if (newPassword.length < 8) {
    return NextResponse.json({ error: 'La contraseña debe tener al menos 8 caracteres' }, { status: 400 })
  }

  const currentHash = process.env.ADMIN_PASSWORD_HASH
  if (!currentHash) {
    return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 })
  }

  const valid = await bcrypt.compare(currentPassword, currentHash)
  if (!valid) {
    return NextResponse.json({ error: 'Contraseña actual incorrecta' }, { status: 400 })
  }

  const newHash = await bcrypt.hash(newPassword, 12)

  const token = process.env.NETLIFY_TOKEN
  if (!token) {
    return NextResponse.json({ error: 'NETLIFY_TOKEN no configurado' }, { status: 500 })
  }

  const res = await fetch(
    `https://api.netlify.com/api/v1/accounts/${ACCOUNT_ID}/env/ADMIN_PASSWORD_HASH`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: 'ADMIN_PASSWORD_HASH',
        values: [{ value: newHash, context: 'all' }],
      }),
    }
  )

  if (!res.ok) {
    const err = await res.text()
    console.error('Netlify API error:', err)
    return NextResponse.json({ error: 'Error al actualizar en Netlify' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
