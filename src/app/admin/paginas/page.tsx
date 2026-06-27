'use client'

import { useState, useEffect } from 'react'
import { Save, Loader2, Plus, Trash2, Upload, CheckCircle } from 'lucide-react'
import type { SiteContent } from '@/lib/content'

export default function PaginasPage() {
  const [content, setContent] = useState<SiteContent | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [activeTab, setActiveTab] = useState<'hero' | 'sobreMi' | 'servicios' | 'contacto'>('hero')
  const [uploadingField, setUploadingField] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/contenido').then(r => r.json()).then(data => { setContent(data); setLoading(false) })
  }, [])

  async function handleSave() {
    if (!content) return
    setSaving(true); setSaved(false)
    try {
      await fetch('/api/contenido', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(content) })
      setSaved(true); setTimeout(() => setSaved(false), 3000)
    } finally { setSaving(false) }
  }

  async function uploadImage(field: string, file: File) {
    setUploadingField(field)
    try {
      const fd = new FormData(); fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) {
        setContent(prev => {
          if (!prev) return prev
          if (field === 'hero') return { ...prev, hero: { ...prev.hero, imagenUrl: data.url } }
          if (field === 'sobreMi') return { ...prev, sobreMi: { ...prev.sobreMi, imagenUrl: data.url } }
          return prev
        })
      }
    } finally { setUploadingField(null) }
  }

  async function uploadPortfolioImage(file: File) {
    setUploadingField('portafolio')
    try {
      const fd = new FormData(); fd.append('file', file)
      const res = await fetch('/api/upload', { method: 'POST', body: fd })
      const data = await res.json()
      if (data.url) {
        const newItem = { id: Date.now().toString(), titulo: file.name.split('.')[0], categoria: 'General', imagenUrl: data.url }
        setContent(prev => prev ? { ...prev, portafolio: [...prev.portafolio, newItem] } : prev)
      }
    } finally { setUploadingField(null) }
  }

  if (loading || !content) return <div className="flex items-center justify-center h-64"><Loader2 className="animate-spin text-blue-500" size={32} /></div>

  const tabs = [{ id: 'hero', label: 'Inicio' }, { id: 'sobreMi', label: 'Sobre mí' }, { id: 'servicios', label: 'Servicios' }, { id: 'contacto', label: 'Contacto' }] as const

  const inputCls = "w-full px-3.5 py-2.5 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Editor de contenido</h1>
          <p className="text-gray-500 mt-1">Los cambios se reflejan en el sitio al guardar.</p>
        </div>
        <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl transition-colors disabled:opacity-60">
          {saving ? <Loader2 className="animate-spin" size={16} /> : saved ? <CheckCircle size={16} /> : <Save size={16} />}
          {saving ? 'Guardando...' : saved ? '¡Guardado!' : 'Guardar cambios'}
        </button>
      </div>

      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 text-sm font-medium py-2 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'hero' && (
        <div className="space-y-5">
          {[['titulo','Título principal'],['subtitulo','Subtítulo / tagline'],['descripcion','Descripción']].map(([k, lbl]) => (
            <div key={k}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{lbl}</label>
              {k === 'descripcion'
                ? <textarea rows={3} value={(content.hero as any)[k]} onChange={e => setContent(c => c ? { ...c, hero: { ...c.hero, [k]: e.target.value } } : c)} className={inputCls + ' resize-none'} />
                : <input type="text" value={(content.hero as any)[k]} onChange={e => setContent(c => c ? { ...c, hero: { ...c.hero, [k]: e.target.value } } : c)} className={inputCls} />
              }
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Foto de fondo</label>
            {content.hero.imagenUrl && <div className="relative inline-block mb-2"><img src={content.hero.imagenUrl} alt="" className="h-24 rounded-lg object-cover" /><button onClick={() => setContent(c => c ? { ...c, hero: { ...c.hero, imagenUrl: '' } } : c)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">×</button></div>}
            <label className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer hover:text-blue-700">
              {uploadingField === 'hero' ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
              {uploadingField === 'hero' ? 'Subiendo...' : 'Subir imagen'}
              <input type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) uploadImage('hero', e.target.files[0]) }} />
            </label>
          </div>
        </div>
      )}

      {activeTab === 'sobreMi' && (
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Título</label>
            <input type="text" value={content.sobreMi.titulo} onChange={e => setContent(c => c ? { ...c, sobreMi: { ...c.sobreMi, titulo: e.target.value } } : c)} className={inputCls} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Texto / bio</label>
            <textarea rows={6} value={content.sobreMi.texto} onChange={e => setContent(c => c ? { ...c, sobreMi: { ...c.sobreMi, texto: e.target.value } } : c)} className={inputCls + ' resize-none'} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Foto de perfil</label>
            {content.sobreMi.imagenUrl && <div className="relative inline-block mb-2"><img src={content.sobreMi.imagenUrl} alt="" className="h-24 rounded-lg object-cover" /><button onClick={() => setContent(c => c ? { ...c, sobreMi: { ...c.sobreMi, imagenUrl: '' } } : c)} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">×</button></div>}
            <label className="flex items-center gap-2 text-sm text-blue-600 cursor-pointer hover:text-blue-700">
              {uploadingField === 'sobreMi' ? <Loader2 className="animate-spin" size={14} /> : <Upload size={14} />}
              {uploadingField === 'sobreMi' ? 'Subiendo...' : 'Subir foto'}
              <input type="file" accept="image/*" className="hidden" onChange={e => { if (e.target.files?.[0]) uploadImage('sobreMi', e.target.files[0]) }} />
            </label>
          </div>
        </div>
      )}

      {activeTab === 'servicios' && (
        <div className="space-y-4">
          {content.servicios.map((s, i) => (
            <div key={s.id} className="bg-white border border-gray-100 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between"><span className="text-xs font-semibold text-gray-400 uppercase">Servicio {i + 1}</span><button onClick={() => setContent(c => c ? { ...c, servicios: c.servicios.filter((_,idx)=>idx!==i) } : c)} className="text-red-400 hover:text-red-600"><Trash2 size={15}/></button></div>
              <input type="text" placeholder="Título" value={s.titulo} onChange={e => setContent(c => { if(!c)return c; const sv=[...c.servicios]; sv[i]={...sv[i],titulo:e.target.value}; return{...c,servicios:sv} })} className={inputCls} />
              <textarea placeholder="Descripción" rows={2} value={s.descripcion} onChange={e => setContent(c => { if(!c)return c; const sv=[...c.servicios]; sv[i]={...sv[i],descripcion:e.target.value}; return{...c,servicios:sv} })} className={inputCls+' resize-none'} />
              <input type="text" placeholder="Precio (ej: Desde $1,500 MXN)" value={s.precio} onChange={e => setContent(c => { if(!c)return c; const sv=[...c.servicios]; sv[i]={...sv[i],precio:e.target.value}; return{...c,servicios:sv} })} className={inputCls} />
            </div>
          ))}
          <button onClick={() => setContent(c => c ? { ...c, servicios:[...c.servicios,{id:Date.now().toString(),titulo:'',descripcion:'',precio:''}]} : c)} className="flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700">
            <Plus size={16}/> Agregar servicio
          </button>
        </div>
      )}

      {activeTab === 'contacto' && (
        <div className="space-y-5">
          {[['email','Email de contacto','email',''],['telefono','Teléfono','text','+52 33 1234 5678'],['instagram','Instagram (sin @)','text','diegophoto'],['whatsapp','WhatsApp (con código de país)','text','5213312345678']].map(([k,lbl,type,ph])=>(
            <div key={k}>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">{lbl}</label>
              <input type={type} placeholder={ph} value={(content.contacto as any)[k]} onChange={e=>setContent(c=>c?{...c,contacto:{...c.contacto,[k]:e.target.value}}:c)} className={inputCls}/>
            </div>
          ))}
        </div>
      )}

      {/* PORTAFOLIO */}
      <div className="mt-10 pt-8 border-t border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <div><h2 className="text-lg font-bold text-gray-900">Portafolio</h2><p className="text-sm text-gray-500">Fotos que aparecen en la galería del sitio.</p></div>
          <label className="flex items-center gap-2 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors">
            {uploadingField==='portafolio'?<Loader2 className="animate-spin" size={14}/>:<Upload size={14}/>} Subir foto
            <input type="file" accept="image/*" multiple className="hidden" onChange={async e=>{for(const f of Array.from(e.target.files||[]))await uploadPortfolioImage(f)}}/>
          </label>
        </div>
        {content.portafolio.length>0?(
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {content.portafolio.map((item,i)=>(
              <div key={item.id} className="relative group aspect-square rounded-xl overflow-hidden bg-gray-100">
                <img src={item.imagenUrl} alt={item.titulo} className="w-full h-full object-cover"/>
                <button onClick={()=>setContent(c=>c?{...c,portafolio:c.portafolio.filter((_,idx)=>idx!==i)}:c)} className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><Trash2 size={11}/></button>
              </div>
            ))}
          </div>
        ):(
          <div className="border-2 border-dashed border-gray-200 rounded-xl py-12 text-center text-gray-400"><p className="text-3xl mb-2">🖼️</p><p className="text-sm">Sube fotos usando el botón de arriba</p></div>
        )}
      </div>
    </div>
  )
}
