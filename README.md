# 🚀 Jóvenes en Órbita — Plataforma Educativa de Astronomía

<div align="center">

**Plataforma web interactiva de divulgación astronómica construida con Next.js 16, diseñada para acercar el cosmos a jóvenes de habla hispana e inglesa.**

[![Next.js](https://img.shields.io/badge/Next.js-16.2.4-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.4-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6-2D3748?logo=prisma)](https://www.prisma.io/)

</div>

---

## 📑 Índice

- [Descripción](#-descripción)
- [Stack Tecnológico](#-stack-tecnológico)
- [Requisitos Previos](#-requisitos-previos)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Variables de Entorno](#-variables-de-entorno)
- [Scripts Disponibles](#-scripts-disponibles)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Arquitectura](#-arquitectura)
- [Rutas y Páginas](#-rutas-y-páginas)
- [Componentes](#-componentes)
- [API Routes](#-api-routes)
- [Base de Datos](#-base-de-datos)
- [Internacionalización (i18n)](#-internacionalización-i18n)
- [Estilos y Design System](#-estilos-y-design-system)
- [Despliegue](#-despliegue)

---

## 🌌 Descripción

**Jóvenes en Órbita (JEO)** es una plataforma educativa que ofrece contenido astronómico interactivo y visualmente inmersivo. La experiencia incluye:

- 🪐 **Sistema Solar interactivo** — Grid de planetas y lunas con imágenes reales de NASA/ESA
- 🌟 **Catálogo de estructuras cósmicas** — Desde supercúmulos hasta meteoroides (13 categorías)
- 🔭 **Dato astronómico** — Artículos de divulgación científica
- 📰 **Sección de noticias** — Novedades del mundo de la astronomía
- 🌠 **Constelaciones y galería fotográfica** — Contenido visual del cosmos
- 🇦🇷 **Argentina en el Espacio** — Sección dedicada al programa espacial argentino
- 🌙 **Observación del cielo** — Guías para observación astronómica
- 📬 **Newsletter y contacto** — Formularios con envío de emails vía Resend
- 🌐 **Bilingüe (ES/EN)** — Internacionalización completa con `next-intl`

---

## 🛠 Stack Tecnológico

| Categoría       | Tecnología                                                           |
| --------------- | -------------------------------------------------------------------- |
| **Framework**   | [Next.js 16](https://nextjs.org/) (App Router)                      |
| **UI**          | [React 19](https://react.dev/)                                      |
| **Lenguaje**    | [TypeScript 5](https://www.typescriptlang.org/)                     |
| **Estilos**     | [Tailwind CSS 4](https://tailwindcss.com/) + CSS custom properties  |
| **Animaciones** | [Framer Motion](https://www.framer.com/motion/)                     |
| **Partículas**  | [tsParticles](https://particles.js.org/)                            |
| **Carrusel**    | [Embla Carousel](https://www.embla-carousel.com/) + Autoplay        |
| **Iconos**      | [Lucide React](https://lucide.dev/)                                 |
| **ORM**         | [Prisma 6](https://www.prisma.io/)                                  |
| **Base de datos** | PostgreSQL (Supabase)                                              |
| **Emails**      | [Resend](https://resend.com/)                                       |
| **Formularios** | [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) |
| **i18n**        | [next-intl 4](https://next-intl-docs.vercel.app/)                   |
| **Fuentes**     | Inter (Google Fonts via `next/font`)                                 |
| **Package Mgr** | [pnpm](https://pnpm.io/)                                            |

---

## 📋 Requisitos Previos

- **Node.js** ≥ 18.x
- **pnpm** ≥ 8.x (`npm install -g pnpm`)
- **PostgreSQL** — Se recomienda [Supabase](https://supabase.com/) (tier gratuito disponible)

---

## ⚡ Instalación y Configuración

```bash
# 1. Clonar el repositorio
git clone https://github.com/Jovenes-en-Orbita/jeo-monorepo-platform.git
cd jeo-monorepo-platform

# 2. Instalar dependencias
pnpm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales (ver sección de variables de entorno)

# 4. Generar el cliente de Prisma
pnpm db:generate

# 5. Aplicar migraciones / sincronizar esquema
pnpm db:push

# 6. (Opcional) Ejecutar seed de datos iniciales
pnpm db:seed

# 7. Iniciar servidor de desarrollo
pnpm dev
```

La aplicación estará disponible en **[http://localhost:3000](http://localhost:3000)**.

---

## 🔐 Variables de Entorno

Crear un archivo `.env` en la raíz del proyecto basado en `.env.example`:

```env
# Base de datos (Supabase PostgreSQL)
DATABASE_URL="postgresql://postgres.XXXX:[PASSWORD]@XXXX:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.XXXX:[PASSWORD]@XXXX:5432/postgres"

# URL pública de la aplicación
NEXT_PUBLIC_API_URL=http://localhost:3000

# (Opcional) API Key de Resend para envío de emails
RESEND_API_KEY=re_your_api_key
```

| Variable              | Requerida | Descripción                                                       |
| --------------------- | --------- | ----------------------------------------------------------------- |
| `DATABASE_URL`        | ✅        | URL de conexión a PostgreSQL (con connection pooling / pgBouncer) |
| `DIRECT_URL`          | ✅        | URL directa a PostgreSQL (usada por migraciones de Prisma)        |
| `NEXT_PUBLIC_API_URL` | ⚠️        | URL base de la aplicación                                         |
| `RESEND_API_KEY`      | ❌        | API key de Resend para emails (newsletter y contacto)             |

> **Nota:** Los formularios de contacto y newsletter funcionan sin `RESEND_API_KEY` — los datos se guardan en la base de datos, pero no se envían emails de notificación/confirmación.

---

## 📜 Scripts Disponibles

```bash
pnpm dev            # Servidor de desarrollo (Next.js)
pnpm build          # Build de producción
pnpm start          # Iniciar servidor de producción
pnpm lint           # Ejecutar ESLint

pnpm db:generate    # Generar Prisma Client
pnpm db:push        # Sincronizar esquema con la base de datos
pnpm db:migrate     # Ejecutar migraciones de desarrollo
pnpm db:studio      # Abrir Prisma Studio (GUI de base de datos)
pnpm db:seed        # Ejecutar seed de datos iniciales
```

---

## 📁 Estructura del Proyecto

```
plataforma-jeo/
├── app/
│   ├── globals.css                    # Estilos globales + design tokens cósmicos
│   ├── layout.tsx                     # Root layout (fuente Inter, estilos base)
│   ├── page.tsx                       # Redirect a locale
│   ├── data/
│   │   ├── home.ts                    # Datos estáticos: planetas, lunas, materia, hero
│   │   └── structures.ts             # Catálogo de 13 estructuras cósmicas
│   ├── api/
│   │   ├── contact/route.ts           # POST /api/contact — formulario de contacto
│   │   └── newsletter/route.ts        # POST /api/newsletter — suscripción newsletter
│   └── [locale]/
│       ├── layout.tsx                 # Layout con i18n, Header, Footer, metadata SEO
│       ├── page.tsx                   # Página principal (12 secciones)
│       ├── universo/page.tsx          # Página "El Universo"
│       ├── estructuras/page.tsx       # Catálogo de estructuras cósmicas
│       ├── dato-astronomico/page.tsx  # Dato astronómico / artículos
│       ├── noticias/[slug]/page.tsx   # Detalle de noticia (ruta dinámica)
│       ├── explorar/
│       │   ├── argentina-espacio/     # Argentina en el Espacio
│       │   └── cielo/                 # Observación del cielo
│       └── components/
│           ├── home/                  # 12 componentes de la página principal
│           ├── layout/                # Header, Footer y sub-componentes
│           └── shared/                # Componentes reutilizables
├── i18n/
│   ├── routing.ts                     # Configuración de locales (es, en)
│   └── request.ts                     # Carga de mensajes por locale
├── messages/
│   ├── es.json                        # Traducciones Español (~21KB)
│   └── en.json                        # Traducciones Inglés (~21KB)
├── lib/
│   └── prisma.ts                      # Singleton de Prisma Client
├── prisma/
│   ├── schema.prisma                  # Esquema de base de datos
│   └── seed.ts                        # Seed de datos iniciales
├── proxy.ts                           # Middleware de next-intl (locale routing)
├── public/                            # Assets estáticos (SVGs)
├── next.config.ts                     # Config Next.js + next-intl plugin
├── tsconfig.json                      # Config TypeScript
├── postcss.config.mjs                 # PostCSS (Tailwind)
├── eslint.config.mjs                  # ESLint config
└── package.json
```

---

## 🏗 Arquitectura

### App Router (Next.js 16)

El proyecto utiliza el **App Router** con la siguiente jerarquía de layouts:

```
app/layout.tsx                    → Root Layout (fuente, estilos globales)
  └── app/[locale]/layout.tsx     → Locale Layout (i18n provider, Header, Footer, SEO)
        ├── page.tsx              → Home (12 secciones)
        ├── universo/             → Página del Universo
        ├── estructuras/          → Catálogo de estructuras
        ├── dato-astronomico/     → Artículos astronómicos
        ├── noticias/[slug]/      → Detalle de noticias (dinámica)
        └── explorar/             → Secciones de exploración
```

### Patrón de Componentes

- **Server Components** por defecto — Las páginas usan `setRequestLocale()` para SSG
- **Client Components** (`"use client"`) — Solo donde se necesita interactividad (Header, popups, formularios, animaciones)
- **Generación estática** — `generateStaticParams()` para pre-renderizar todas las combinaciones de locale

---

## 🗺 Rutas y Páginas

| Ruta                                 | Descripción                          |
| ------------------------------------ | ------------------------------------ |
| `/[locale]`                          | Página principal con 12 secciones    |
| `/[locale]/universo`                 | Origen, evolución y composición del universo |
| `/[locale]/estructuras`              | Catálogo de 13 estructuras cósmicas  |
| `/[locale]/dato-astronomico`         | Artículos y datos astronómicos       |
| `/[locale]/noticias/[slug]`          | Detalle de una noticia               |
| `/[locale]/explorar/argentina-espacio` | Programa espacial argentino        |
| `/[locale]/explorar/cielo`           | Guía de observación del cielo        |

Donde `[locale]` = `es` (por defecto) o `en`.

---

## 🧩 Componentes

### Página Principal (`home/`)

| Componente               | Descripción                                          |
| ------------------------ | ---------------------------------------------------- |
| `WelcomePopup`           | Popup de bienvenida con animaciones                  |
| `HeroSlider`             | Carrusel hero con imágenes del cosmos                |
| `UniverseInfoSection`    | Introducción al universo                             |
| `MatterCards`             | Cards de tipos de materia (oscura, bariónica, etc.)  |
| `PlanetGrid`             | Grid interactivo de los 8 planetas                   |
| `MoonLayout`             | Top 5 lunas del sistema solar con ranking            |
| `ConstellationSection`   | Sección de constelaciones                            |
| `NewsSection`            | Últimas noticias astronómicas                        |
| `AstronomicalFactCard`   | Card de dato astronómico destacado                   |
| `PhotoGallerySection`    | Galería de fotografías cósmicas                      |
| `AboutSection`           | Quiénes somos                                        |
| `ExploreMoreCards`        | Cards de navegación a secciones de exploración       |

### Layout (`layout/`)

| Componente         | Descripción                                                          |
| ------------------ | -------------------------------------------------------------------- |
| `Header`           | Navbar flotante con glassmorphism, links contextuales y menú overlay |
| `Footer`           | Footer con información, formulario de contacto y partículas          |
| `LanguageSwitcher` | Selector de idioma (ES/EN)                                           |

### Shared (`shared/`)

| Componente         | Descripción                                            |
| ------------------ | ------------------------------------------------------ |
| `SpaceBackground`  | Fondo animado con partículas (tsParticles)             |
| `NebulaGlows`      | Efectos decorativos de nebulosa con gradientes          |
| `GlowImage`        | Imagen con efecto de resplandor                        |
| `HeroContent`      | Contenido hero reutilizable                            |
| `ImageOverlayCard` | Card con imagen de fondo y overlay                     |
| `InteractiveLink`  | Link con animaciones de hover                          |
| `SectionBadge`     | Badge/etiqueta de sección                              |
| `SocialLinks`      | Links a redes sociales                                 |

---

## 🔌 API Routes

### `POST /api/contact`

Recibe mensajes del formulario de contacto.

**Body:**
```json
{
  "nombre": "string",
  "apellido": "string",
  "email": "string",
  "asunto": "string",
  "mensaje": "string"
}
```

**Comportamiento:**
1. Valida que `email` y `mensaje` no estén vacíos
2. Guarda el mensaje en la tabla `contact_messages` (Prisma)
3. Si `RESEND_API_KEY` está configurada, envía un email de notificación al administrador

---

### `POST /api/newsletter`

Suscribe un usuario al newsletter.

**Body:**
```json
{
  "email": "string",
  "name": "string (opcional)"
}
```

**Comportamiento:**
1. Valida que `email` no esté vacío
2. Upsert en la tabla `newsletter_subscribers` (no duplica suscriptores)
3. Si `RESEND_API_KEY` está configurada, envía un email de bienvenida al suscriptor

---

## 🗄 Base de Datos

El esquema Prisma define 4 modelos conectados a **PostgreSQL vía Supabase**:

```prisma
model User                 → users
model NewsletterSubscriber → newsletter_subscribers
model ContactMessage       → contact_messages
model AstronomicalPost     → astronomical_posts
```

### Diagrama de Modelos

```
┌──────────────────────────┐   ┌──────────────────────────────┐
│ User                     │   │ NewsletterSubscriber         │
├──────────────────────────┤   ├──────────────────────────────┤
│ id       String (UUID)   │   │ id       String (UUID)       │
│ email    String (unique) │   │ email    String (unique)     │
│ name     String?         │   │ name     String?             │
│ createdAt DateTime       │   │ createdAt DateTime           │
│ updatedAt DateTime       │   └──────────────────────────────┘
└──────────────────────────┘
┌──────────────────────────┐   ┌──────────────────────────────┐
│ ContactMessage           │   │ AstronomicalPost             │
├──────────────────────────┤   ├──────────────────────────────┤
│ id       String (UUID)   │   │ id          String (UUID)    │
│ name     String          │   │ title       String           │
│ email    String          │   │ content     String (Text)    │
│ subject  String          │   │ imageUrl    String?          │
│ message  String          │   │ category    String           │
│ createdAt DateTime       │   │ publishDate DateTime         │
└──────────────────────────┘   │ createdAt   DateTime         │
                               └──────────────────────────────┘
```

### Comandos de Base de Datos

```bash
pnpm db:generate    # Regenerar el cliente tras cambios en schema.prisma
pnpm db:push        # Sincronizar esquema → DB (sin generar migración)
pnpm db:migrate     # Crear y aplicar migración de desarrollo
pnpm db:studio      # Abrir GUI para explorar datos
pnpm db:seed        # Ejecutar seed (crea usuario admin)
```

---

## 🌐 Internacionalización (i18n)

Implementada con **[next-intl v4](https://next-intl-docs.vercel.app/)**.

| Configuración       | Valor                                |
| -------------------- | ------------------------------------ |
| **Locales**          | `es` (Español), `en` (English)       |
| **Locale por defecto** | `es`                              |
| **Detección automática** | Sí (`localeDetection: true`)   |
| **Archivos de traducción** | `messages/es.json`, `messages/en.json` |

### Estructura de las traducciones

Los archivos JSON (~21KB cada uno) cubren todos los namespaces de la aplicación:

- `metadata` — Títulos y descripciones SEO
- `nav` — Etiquetas de navegación
- `hero` — Sección hero
- `universe`, `matter`, `planets`, `moons` — Contenido astronómico
- `constellations`, `news`, `gallery` — Secciones de contenido
- `about`, `contact`, `newsletter` — Secciones institucionales
- `universePage`, `structuresPage`, `datoPage` — Páginas internas
- `newsDetail` — Detalle de noticias

### Uso en componentes

```tsx
// Server Component
import { getTranslations } from "next-intl/server";
const t = await getTranslations("namespace");

// Client Component
import { useTranslations } from "next-intl";
const t = useTranslations("namespace");
```

---

## 🎨 Estilos y Design System

### Paleta Cósmica

El proyecto define un sistema de colores custom en `globals.css`:

| Token                   | Valor        | Uso                          |
| ----------------------- | ------------ | ---------------------------- |
| `--color-space-black`   | `#0a0a0f`    | Fondo principal              |
| `--color-space-dark`    | `#0f0f1a`    | Fondo secundario             |
| `--color-nebula-purple` | `#6c3fa0`    | Acentos púrpura              |
| `--color-nebula-blue`   | `#3b82f6`    | Acentos azul                 |
| `--color-nebula-cyan`   | `#22d3ee`    | Acentos cyan                 |
| `--color-star-gold`     | `#f4c542`    | Acentos dorados              |
| `--color-cosmic-white`  | `#f0f0f5`    | Texto principal              |
| `--color-surface-card`  | `#1a1a2e`    | Fondo de cards               |

### Animaciones Globales

- **`animate-float`** — Flotación suave (6s loop)
- **`animate-pulse-glow`** — Resplandor pulsante (3s loop)
- **`animate-fade-in-up`** — Entrada con fade + slide up

### Características de Diseño

- 🌑 **Dark theme exclusivo** — Diseño espacial inmersivo
- 💎 **Glassmorphism** — Header flotante con `backdrop-blur-xl`
- ✨ **Partículas animadas** — Fondos con tsParticles
- 🎭 **Micro-animaciones** — Framer Motion en transiciones y hovers
- 📱 **Responsive** — Diseño adaptativo mobile-first
- 🎨 **Scrollbar personalizado** — Colores de nebulosa

---

## 🚢 Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

O conecta el repositorio directamente desde el [Dashboard de Vercel](https://vercel.com/new).

**Configurar en Vercel:**
1. Framework Preset: **Next.js**
2. Variables de entorno: `DATABASE_URL`, `DIRECT_URL`, `RESEND_API_KEY`
3. Build Command: `pnpm build` (automático)

### Docker

El proyecto incluye un `.dockerignore` para builds containerizados.

### Dominios de imágenes autorizados

Las imágenes remotas están autorizadas para los siguientes dominios en `next.config.ts`:

- `i.ibb.co`
- `i.postimg.cc`
- `www.nasa.gov`

---

## 📄 Licencia

Este proyecto es propiedad de **Jóvenes en Órbita**. Todos los derechos reservados.

---

<div align="center">

Hecho con 💜 por el equipo de **Jóvenes en Órbita**

*"El cosmos es todo lo que es, todo lo que fue y todo lo que será."* — Carl Sagan

</div>
