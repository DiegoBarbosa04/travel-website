# AGENTS.md

Projeto full-stack de busca de voos (pt-BR). Dois pacotes independentes (`backend/` e `frontend/`), sem workspaces — cada um com `package.json`, `npm install` e `npm run` próprios. Sem testes e sem CI.

## Comandos

| Ação | Comando | Observações |
| --- | --- | --- |
| Backend dev | `cd backend && npm run dev` | `tsx --env-file=../.env --watch src/server.ts` → porta **3000**. Lê o `.env` da raiz via `--env-file` |
| Frontend dev | `cd frontend && npm run dev` | Vite → porta **5173** |
| Backend build | `cd backend && npm run build` | `tsc` → `dist/` (gitignored) |
| Backend start | `cd backend && npm start` | `node dist/src/server.js` — **não** carrega o `.env` da raiz (ver gotcha abaixo) |
| Frontend build | `cd frontend && npm run build` | `tsc -b && vite build` |
| Frontend lint | `cd frontend && npm run lint` | **Já falha com erros pré-existentes** (ver abaixo) |
| Migrations | `cd backend && npx prisma migrate dev` | precisa `DATABASE_URL` acessível no cwd (ver gotcha) |
| Subir tudo | `docker compose up --build` | backend:3000, frontend:5173, db:5432; usa `.env` da raiz |
| Testes | — | Não existem. `npm test` no backend é stub que retorna erro |

## Gotchas de ambiente (`.env`)

- O `.env` real fica só na **raiz** do repo (gitignored); `.env.example` documenta as variáveis: `DATABASE_URL`, `DUFFEL_API_KEY`, `JWT_SECRET`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`.
- `backend/prisma.config.ts` e `backend/src/lib/prisma.ts` usam `dotenv/config`, que lê `.env` do **cwd**. `npm start` e comandos `prisma` rodam a partir de `backend/`, então NÃO enxergam o `.env` da raiz — exporte as variáveis no shell ou crie `backend/.env` se precisar rodá-los localmente.
- `npm run dev` (backend) é a exceção: o `--env-file=../.env` do tsx injeta as variáveis da raiz.
- CORS no `server.ts` é fixo em `http://localhost:5173` e `baseURL` do axios no frontend é fixo em `http://localhost:3000`. Mudar porta/URL de qualquer lado quebra a comunicação.

## Backend (Express 5 + Prisma 7 + PostgreSQL)

- ESM puro (`"type": "module"`) com `NodeNext` → imports relativos **exigem extensão `.js`** (ex.: `../routes/routes.js`).
- Camadas: `routes/` → `controllers/` → `services/` → `providers/` (chamadas a APIs externas). Esquemas Zod em `schemas/`; validação via `middlewares/validate.middleware.ts`.
- Auth: JWT em cookie chamado `user` (5h), bcrypt p/ senha. `middlewares/auth.middleware.ts` anexa `req.user`.
- Prisma: generator `prisma-client` com output em `backend/generated/prisma` (**gitignored**) + adapter `@prisma/adapter-pg`. O schema **não tem `url`** — a connection string vem do runtime/`prisma.config.ts`. Após mexer no schema: `npx prisma generate` + migration. Deploy usa `npx prisma migrate deploy`.
- APIs externas: **Duffel** (`@duffel/api`, token `DUFFEL_API_KEY`, modo teste gera dados sandbox) para voos e autocomplete de localidades; **Frankfurter.dev** (`GET /v2/rate/USD/BRL`) para câmbio — preço final = `total_amount` × taxa, em BRL (`services/flight.service.ts`).
- `history.controller.ts` e `history.service.ts` são **stubs vazios** — a feature Histórico de pesquisas não está implementada (model `SearchHistory` existe; frontend usa dados mock na aba do perfil).

## Frontend (React 19 + Vite 8 + Tailwind v4)

- Tailwind v4 configurado via plugin `@tailwindcss/vite` — **não há `tailwind.config.js`**; estilos via CSS/`@theme`.
- Alias `@` → `./src` (vite + tsconfig). Kit shadcn/ui em `src/components/ui/`.
- Rotas definidas em `src/main.tsx` (`createBrowserRouter`): `/`, `/flights`, `/profile` (protegido via `ProtectedRoute`), `/login`, `/register`.
- Estado de sessão em `contexts/User.context.tsx` (carrega `/auth/me` no boot). UI 100% em pt-BR; preços formatados com `Intl.NumberFormat("pt-BR", BRL)`.

## Convenções e estado atual

- **Commits: conventional commits em inglês** (`feat:`, `chore:`, `docs:`...), histórico já segue esse padrão.
- `npm run lint` no frontend **falha hoje** com erros pré-existentes: `react-hooks/set-state-in-effect`, `react-refresh/only-export-components` e variáveis não usadas (ex.: `Header.tsx`, `LocationAutocomplete.tsx`, `Flights.tsx`, `MyReviewsTab.tsx`, `User.context.tsx`). Não adicione erros novos; corrigir os antigos é fora de escopo, a menos que pedido. Backend não tem script de lint.
- Arquivos gerados gitignored: `backend/generated/prisma`, `backend/dist`, `frontend/dist`. O `.env` nunca deve ser commitado.