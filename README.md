# 🏗️ Plataforma JEO - Monorepo

Monorepo que contiene el **backend** (NestJS + Prisma) y el **frontend** (Next.js) de la Plataforma JEO.

## 📁 Estructura del proyecto

```
plataforma-jeo-monorepo/
├── jeo-back/                 # Backend - NestJS + Prisma
│   ├── prisma/               # Schema y migraciones de Prisma
│   │   ├── schema.prisma     # Esquema de la base de datos
│   │   └── seed.ts           # Script de seed
│   ├── src/
│   │   ├── prisma/           # Módulo y servicio de Prisma
│   │   ├── app.module.ts     # Módulo raíz
│   │   └── main.ts           # Punto de entrada
│   ├── Dockerfile
│   └── package.json
├── plataforma-jeo/           # Frontend - Next.js
│   ├── app/                  # App Router de Next.js
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml        # Orquestación de contenedores
├── pnpm-workspace.yaml       # Configuración del monorepo
├── package.json              # Scripts globales
├── .env                      # Variables de entorno
└── .env.example              # Template de variables
```

## 🚀 Inicio rápido

### Prerrequisitos

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) >= 9
- [Docker](https://www.docker.com/) y Docker Compose

### 🐳 Con Docker (recomendado)

Levanta **todo** (PostgreSQL + Backend + Frontend) con un solo comando:

```bash
# Copiar variables de entorno
cp .env.example .env

# Levantar todos los servicios
pnpm docker:up

# O en segundo plano
pnpm docker:up:detached

# Ver logs
pnpm docker:logs

# Detener todos los servicios
pnpm docker:down
```

**Servicios disponibles:**
| Servicio    | URL                        |
|------------|----------------------------|
| Frontend   | http://localhost:3000       |
| Backend    | http://localhost:3001       |
| PostgreSQL | localhost:5432              |

### 💻 Desarrollo local (sin Docker)

```bash
# 1. Instalar dependencias (desde la raíz)
pnpm install

# 2. Configurar variables de entorno
cp .env.example .env
# Editar .env con tu configuración de PostgreSQL local

# 3. Ejecutar migraciones de Prisma
pnpm db:migrate:dev

# 4. (Opcional) Ejecutar el seed
pnpm db:seed

# 5. Iniciar ambos proyectos en paralelo
pnpm dev

# O iniciar individualmente
pnpm dev:back    # Solo backend en http://localhost:3001
pnpm dev:front   # Solo frontend en http://localhost:3000
```

## 📦 Scripts disponibles

### Scripts globales (raíz)

| Script              | Descripción                                      |
|--------------------|--------------------------------------------------|
| `pnpm dev`         | Inicia backend y frontend en paralelo            |
| `pnpm dev:back`    | Inicia solo el backend                           |
| `pnpm dev:front`   | Inicia solo el frontend                          |
| `pnpm build`       | Compila ambos proyectos                          |
| `pnpm lint`        | Ejecuta linting en ambos proyectos               |
| `pnpm test`        | Ejecuta tests en ambos proyectos                 |

### Scripts de base de datos

| Script                | Descripción                                    |
|-----------------------|------------------------------------------------|
| `pnpm db:generate`   | Genera el Prisma Client                        |
| `pnpm db:migrate`    | Aplica migraciones pendientes (producción)     |
| `pnpm db:migrate:dev` | Crea y aplica migraciones (desarrollo)        |
| `pnpm db:studio`     | Abre Prisma Studio (GUI para la BD)           |
| `pnpm db:seed`       | Ejecuta el script de seed                      |
| `pnpm db:push`       | Sincroniza el schema sin crear migración       |

### Scripts de Docker

| Script                  | Descripción                                  |
|------------------------|----------------------------------------------|
| `pnpm docker:up`       | Construye e inicia todos los contenedores    |
| `pnpm docker:up:detached` | Lo mismo pero en segundo plano           |
| `pnpm docker:down`     | Detiene y elimina los contenedores           |
| `pnpm docker:logs`     | Muestra los logs de todos los servicios      |

## 🔧 Tecnologías

- **Frontend**: Next.js 16, React 19, TailwindCSS 4, TypeScript
- **Backend**: NestJS 11, Prisma ORM, TypeScript
- **Base de datos**: PostgreSQL 16
- **Contenedores**: Docker, Docker Compose
- **Package Manager**: pnpm (workspaces)
- **Testing**: Jest, Playwright
