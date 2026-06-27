# Sitio Diego Camacho

Sitio web tipo Squarespace con panel de administración. Construido con Next.js 14, NextAuth, Tailwind CSS y deployado en Netlify.

## Fases

| Fase | Estado      | Descripción |
|------|-------------|-------------|
| 1    | ✅ Activa   | Arquitectura base, panel admin con autenticación, deploy en Netlify |
| 2    | 🔜 Próxima  | Editor de contenido visual, gestor de archivos, secciones del sitio |
| 3    | 🔜 Futura   | Formularios, SEO avanzado, dominio personalizado |

---

## Setup local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local`:

```
NEXTAUTH_SECRET=   # genera con: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
ADMIN_EMAIL=tu@email.com
ADMIN_PASSWORD_HASH=   # ver paso 3
```

### 3. Generar hash de contraseña

```bash
node tools/hash-password.js "tu-contraseña-segura"
```

Copia el resultado en `ADMIN_PASSWORD_HASH`.

### 4. Correr en desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Panel admin: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## Deploy en Netlify

### Variables de entorno en Netlify

En **Netlify → Project settings → Environment variables**, agrega:

| Variable | Valor |
|---|---|
| `NEXTAUTH_SECRET` | (el mismo que usas en local) |
| `NEXTAUTH_URL` | `https://tu-sitio.netlify.app` |
| `ADMIN_EMAIL` | tu email de admin |
| `ADMIN_PASSWORD_HASH` | el hash generado con `hash-password.js` |

### Conectar con GitHub

1. En Netlify: **Add new site → Import an existing project**
2. Selecciona el repo `sitio-diego-camacho`
3. Build command: `npm run build`
4. Publish directory: `.next`
5. El plugin `@netlify/plugin-nextjs` se instala automáticamente desde `netlify.toml`

---

## Estructura del proyecto

```
src/
├── app/
│   ├── page.tsx                    # Página pública principal
│   ├── layout.tsx                  # Layout raíz
│   ├── globals.css
│   ├── api/auth/[...nextauth]/     # API de autenticación
│   └── admin/
│       ├── layout.tsx              # Layout admin (protegido)
│       ├── login/page.tsx          # Página de login
│       ├── dashboard/page.tsx      # Dashboard principal
│       ├── paginas/page.tsx        # Gestión de páginas
│       ├── media/page.tsx          # Gestión de archivos
│       └── configuracion/page.tsx  # Configuración del sitio
├── components/
│   ├── Providers.tsx               # SessionProvider wrapper
│   └── admin/
│       └── AdminSidebar.tsx        # Sidebar de navegación admin
└── lib/                            # Utilidades compartidas (Fase 2+)

tools/
└── hash-password.js                # Script para generar hash de contraseña
```

## Stack

- **Framework**: Next.js 14 (App Router)
- **Auth**: NextAuth v4 con JWT + Credentials
- **Estilos**: Tailwind CSS
- **Deploy**: Netlify + @netlify/plugin-nextjs
- **Lenguaje**: TypeScript
