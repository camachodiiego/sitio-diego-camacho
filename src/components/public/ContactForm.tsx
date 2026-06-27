'use client'

import { useState } from 'react'
import { Loader2, Send, CheckCircle } from 'lucide-react'

export function ContactForm() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' })
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Error al enviar')
      setSent(true)
    } catch {
      setError('Hubo un error. Por favor intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center py-12">
        <CheckCircle className="text-green-400 mb-4" size={48} />
        <h3 className="text-xl font-bold text-white mb-2">¡Mensaje enviado!</h3>
        <p className="text-gray-400">Te responderé a la brevedad.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Nombre</label>
        <input
          type="text"
          value={form.nombre}
          onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))}
          required
          placeholder="Tu nombre"
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
          placeholder="tu@email.com"
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-1.5">Mensaje</label>
        <textarea
          value={form.mensaje}
          onChange={e => setForm(f => ({ ...f, mensaje: e.target.value }))}
          required
          rows={5}
          placeholder="Cuéntame sobre tu proyecto..."
          className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-500
                     focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
        />
      </div>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500
                   text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
      >
        {loading ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
        {loading ? 'Enviando...' : 'Enviar mensaje'}
      </button>
    </form>
  )
}
