<p align="center">
  <a href="" rel="noopener">
    <img width="90" height="90" src="./public/logo.png" alt="logo">
  </a>
</p>

<h3 align="center">Jolteon — Next.js 15 + Auth0 + Prisma + 3D (R3F)</h3>

## 📝 Sumário

- [📝 Sumário](#-sumário)
- [📦 Tecnologias ](#-tecnologias-)
- [🚀 Começando ](#-começando-)
  - [Pré-requisitos](#pré-requisitos)
  - [Ambiente local](#ambiente-local)
  - [Usando Docker](#usando-docker)
  - [Scripts NPM](#scripts-npm)
- [🗄️ Banco de Dados (Prisma)](#️-banco-de-dados-prisma)
- [🔐 Autenticação (Auth0)](#-autenticação-auth0)
- [🧰 Qualidade de Código e Hooks (Lefthook)](#-qualidade-de-código-e-hooks-lefthook)
- [🧩 Estrutura resumida ](#-estrutura-resumida-)

## 📦 Tecnologias <a name="tecnologias"></a>

- **Framework**: Next.js 15.5.2 (App Router) • React 19
- **Linguagem**: TypeScript 5.8.3
- **3D**: three 0.180 • @react-three/fiber 9.3 • drei 10.7 • postprocessing 3.0
- **Estado e Forms**: Zustand 5 • React Hook Form 7.57 • Zod 3.25
- **Estilos**: Tailwind CSS 4.1 • class-variance-authority • tailwind-merge
- **HTTP**: ky
- **Autenticação**: @auth0/nextjs-auth0 4.6
- **PWA**: next-pwa (service worker, register e skipWaiting)
- **Testes**: Vitest 3.2 • Testing Library • Jest DOM
- **Qualidade**: ESLint 9.28 • Prettier 3.5 • Commitlint • Lefthook

## 🚀 Começando <a name="começando"></a>

### Pré-requisitos

- Node.js 20+
- PostgreSQL (local ou via Docker)
- Conta no Auth0 (aplicação regular web)

Crie um `.env` na raiz. Exemplo para desenvolvimento local (dev em `http://localhost:3002`):

```env
# Auth0
AUTH0_SECRET=""
AUTH0_DOMAIN=""
AUTH0_CLIENT_ID=""
AUTH0_CLIENT_SECRET=""
APP_BASE_URL="http://localhost:3002"
# Opcional (APIs protegidas)
AUTH0_SCOPE=""
AUTH0_AUDIENCE=""

# Postgres (local)
POSTGRES_DB="app_db"
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"

# Prisma
DATABASE_URL="postgresql://POSTGRES_USER:POSTGRES_PASSWORD@localhost:5432/POSTGRES_DB"
```

Se for usar Docker (app em `http://localhost:3000`), ajuste:

```env
APP_BASE_URL="http://localhost:3000"
DATABASE_URL="postgresql://POSTGRES_USER:POSTGRES_PASSWORD@postgres:5432/POSTGRES_DB"
```

### Ambiente local

```bash
# instalar dependências
npm install

# gerar cliente do prisma e aplicar migrações
npx prisma generate
npx prisma migrate dev

# (opcional) popular base
npx prisma db seed

# subir o servidor de desenvolvimento (porta 3002)
npm run dev
```

### Usando Docker

```bash
# subir containers (postgres + app)
npm run docker-up
# ou
docker-compose up -d

# parar
npm run docker-down
# ou
docker-compose down
```

- Postgres expõe `5432:5432` com volume `postgres-data`.
- App roda em produção dentro do container na porta 3000 (`npm start`).

### Scripts NPM

```bash
npm run dev            # next dev --turbo --port 3002
npm run build          # next build
npm start              # next start (produção, porta 3000 por padrão)
npm test               # vitest
npm run test:coverage  # vitest run --coverage
npm run test:deploy    # vitest --run
npm run test:snapshot  # vitest -u
npm run docker-up      # docker-compose up -d
npm run docker-down    # docker-compose down
```

## 🗄️ Banco de Dados (Prisma)

- Schema: `prisma/schema.prisma` (modelo `Lead`)
- Comandos úteis:

```bash
npx prisma generate
npx prisma migrate dev --name <nome_da_migracao>
npx prisma migrate reset
npx prisma studio
npx prisma db seed
```

- Seed configurado em `package.json`:
  - `"prisma": { "seed": "node --loader ts-node/esm prisma/lib/seed.ts" }`

## 🔐 Autenticação (Auth0)

- SDK: `@auth0/nextjs-auth0` (config em `auth0/lib/auth0.ts`)
- Variáveis obrigatórias: `AUTH0_SECRET`, `AUTH0_DOMAIN`, `AUTH0_CLIENT_ID`, `AUTH0_CLIENT_SECRET`, `APP_BASE_URL`
- Variáveis opcionais (APIs): `AUTH0_SCOPE`, `AUTH0_AUDIENCE`
- URLs no painel do Auth0 (ajuste conforme `APP_BASE_URL`):
  - Allowed Callback URLs: `http://localhost:3002/api/auth/callback`, `http://localhost:3000/api/auth/callback`
  - Allowed Logout URLs: `http://localhost:3002/`, `http://localhost:3000/`
- Rotas padrão do SDK:
  - `/api/auth/login`, `/api/auth/callback`, `/api/auth/logout`

## 🧰 Qualidade de Código e Hooks (Lefthook)

Configuração real (`lefthook.yml`):

```yaml
pre-push:
  parallel: true
  commands:
    packages-audit:
      run: npm run build

pre-commit:
  parallel: true
  commands:
    linter:
      glob: 'src/*.{js,ts,jsx,tsx}'
      run: npx eslint {staged_files}
    prettier:
      glob: '*.{js,ts,jsx,tsx,css,scss,json,md}'
      run: npx prettier --write {staged_files}
    tests:
      glob: '*.{js,ts,jsx,tsx}'
      run: npm run test:deploy --findRelatedTests --bail
```

Uso:

```bash
npx lefthook install
lefthook run pre-commit
lefthook run pre-push
```

Commits seguem Conventional Commits; mensagens em inglês (ex.: `feat: add 3d scene base`).

## 🧩 Estrutura resumida <a name="estrutura-resumida"></a>

- `src/app`: App Router (`layout.tsx`, `page.tsx`, PWA metadata)
- `src/modules/3d`: Canvas, Scene e peças 3D (three + R3F + drei)
- `src/app/auth`: componentes de autenticação (ex.: Navbar, Logout)
- `src/app/common`: hooks e HTTP com `ky`
- `prisma`: `schema.prisma`, seeds e migrações
- `auth0/lib/auth0.ts`: cliente Auth0
- `next.config.mjs`: PWA habilitado e `images.remotePatterns`
- `vitest.config.mts`: JSDOM, cobertura via istanbul

Dicas:

- Dev: app em `http://localhost:3002`
- Docker (prod): app em `http://localhost:3000`
- Imagens remotas permitidas: `lh3.googleusercontent.com`, `images.unsplash.com`
