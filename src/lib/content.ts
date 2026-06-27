/**
 * Content store usando Netlify Blobs.
 * Guarda y lee el contenido del sitio (textos, imágenes, servicios).
 */

export interface SiteContent {
  hero: {
    titulo: string
    subtitulo: string
    descripcion: string
    imagenUrl: string
  }
  sobreMi: {
    titulo: string
    texto: string
    imagenUrl: string
  }
  servicios: Array<{
    id: string
    titulo: string
    descripcion: string
    precio: string
  }>
  contacto: {
    email: string
    telefono: string
    instagram: string
    whatsapp: string
  }
  portafolio: Array<{
    id: string
    titulo: string
    categoria: string
    imagenUrl: string
  }>
}

export const defaultContent: SiteContent = {
  hero: {
    titulo: 'Diego Camacho',
    subtitulo: 'Fotografía & Servicios Creativos',
    descripcion: 'Capturando momentos únicos con visión artística.',
    imagenUrl: '',
  },
  sobreMi: {
    titulo: 'Sobre mí',
    texto: 'Soy Diego Camacho, fotógrafo apasionado con años de experiencia capturando momentos especiales.',
    imagenUrl: '',
  },
  servicios: [
    {
      id: '1',
      titulo: 'Fotografía de Retrato',
      descripcion: 'Sesiones personales y profesionales.',
      precio: 'Desde $1,500 MXN',
    },
    {
      id: '2',
      titulo: 'Fotografía de Eventos',
      descripcion: 'Bodas, quinceañeras, corporativos.',
      precio: 'Desde $5,000 MXN',
    },
    {
      id: '3',
      titulo: 'Fotografía Comercial',
      descripcion: 'Productos, restaurantes, marcas.',
      precio: 'Desde $3,000 MXN',
    },
  ],
  contacto: {
    email: 'diego.photo9@gmail.com',
    telefono: '',
    instagram: '',
    whatsapp: '',
  },
  portafolio: [],
}

// ── Netlify Blobs (runtime only) ──────────────────────────────────────────────

async function getStore() {
  const { getStore } = await import('@netlify/blobs')
  return getStore('site-content')
}

export async function getContent(): Promise<SiteContent> {
  try {
    const store = await getStore()
    const raw = await store.get('content', { type: 'json' })
    if (!raw) return defaultContent
    return { ...defaultContent, ...raw } as SiteContent
  } catch {
    return defaultContent
  }
}

export async function saveContent(content: SiteContent): Promise<void> {
  const store = await getStore()
  await store.set('content', JSON.stringify(content))
}
