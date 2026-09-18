# Travel Website

Plataforma de busca de voos em português (pt-BR) com precificação convertida para Real (BRL), autenticação de usuários e sistema de avaliações. Projeto full-stack construído com React, Express e PostgreSQL.

## Funcionalidades

- **Busca de voos** — pesquisa de trechos de ida com autocomplete de aeroportos/cidades, seleção de data e quantidade de passageiros
- **Conversão de moeda** — preços retornados em USD pela API de voos são convertidos para BRL em tempo real
- **Filtros e ordenação** — filtro por faixa de preço, companhias aéreas e horário, além de ordenação por preço e duração
- **Autenticação** — cadastro e login com senha criptografada (bcrypt) e sessão via JWT em cookie
- **Avaliações** — usuários autenticados podem criar, editar e excluir avaliações
- **Perfil do usuário** — área protegida com dados da conta, avaliações e histórico de pesquisas
- **Layout responsivo** — navegação com menu mobile, dark mode e interface em português

## Screenshots

_Adicionar screenshots da aplicação aqui._

## Stack

| Camada | Tecnologias |
| --- | --- |
| Frontend | React 19, Vite 8, TypeScript, Tailwind CSS 4, shadcn/ui, React Router 7, React Hook Form + Zod |
| Backend | Node.js, Express 5, TypeScript, Prisma 7, Zod, JSON Web Token, bcrypt |
| Banco de dados | PostgreSQL |
| APIs externas | Duffel API (voos e localidades), Frankfurter.dev (taxa de câmbio USD → BRL) |
| Infraestrutura | Docker, Docker Compose, Nginx |

## Arquitetura

```
┌─────────────┐   HTTP/JSON    ┌──────────────┐   API calls   ┌──────────────────┐
│  React SPA  │ ─────────────► │  Express API │ ────────────► │   Duffel API     │
│  (Vite)     │                │   (port 3000)│                └──────────────────┘
└─────────────┘                │      │       │                ┌──────────────────┐
        ▲                      │      │       │ ────────────► │ Frankfurter.dev  │
        │    JWT cookie        │      ▼       │                └──────────────────┘
        └──────────────────────│  Prisma ORM  │
                               │      │       │
                               │      ▼       │
                               │  PostgreSQL  │
                               └──────────────┘
```

## Endpoints da API

### Autenticação
| Método | Rota | Descrição |
| --- | --- | --- |
| `POST` | `/auth/register` | Cria um novo usuário |
| `POST` | `/auth/login` | Autentica e cria sessão (cookie JWT) |
| `GET` | `/auth/me` | Retorna o usuário autenticado |
| `POST` | `/auth/logout` | Encerra a sessão |

### Localidades
| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/locations/search?keyword=` | Autocomplete de aeroportos e cidades |

### Voos
| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/flights/search?origin=&destination=&departureDate=&adults=` | Busca ofertas de voos com preço em BRL |

### Avaliações
| Método | Rota | Descrição |
| --- | --- | --- |
| `GET` | `/reviews/` | Lista avaliações públicas |
| `GET` | `/reviews/me` | Lista avaliações do usuário autenticado |
| `POST` | `/reviews/` | Cria uma avaliação (autenticado) |
| `PUT` | `/reviews/:id` | Atualiza avaliação própria |
| `DELETE` | `/reviews/:id` | Exclui avaliação própria |

## Como rodar

### Pré-requisitos

- Node.js 22+
- Docker e Docker Compose (para o modo com containers)
- Chave de API da [Duffel](https://duffel.com) (ambiente de teste)

### Variáveis de ambiente

Copie `.env.example` para `.env` e preencha os valores:

```
DATABASE_URL=postgresql://user:password@localhost:5432/travel_website
DUFFEL_API_KEY=sua_chave_duffel
JWT_SECRET=seu_segredo_jwt
POSTGRES_USER=user
POSTGRES_PASSWORD=password
POSTGRES_DB=travel_website
```

### Com Docker Compose

```bash
docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

### Modo de desenvolvimento

**Backend**

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

Acesse http://localhost:5173.

## Estrutura do projeto

```
├── backend/              # API Express + Prisma
│   ├── prisma/           # Schema e migrations
│   └── src/
│       ├── controllers/  # Handlers das rotas
│       ├── middlewares/  # Auth e validação
│       ├── providers/    # Integrações com APIs externas
│       ├── routes/       # Definição de rotas
│       ├── schemas/      # Validação com Zod
│       └── services/     # Lógica de negócio
├── frontend/             # SPA React + Vite
│   └── src/
│       ├── components/   # Componentes de UI
│       ├── contexts/     # Estado global
│       ├── pages/        # Páginas da aplicação
│       ├── schemas/      # Validação com Zod
│       └── services/     # Cliente HTTP
├── docker-compose.yml
└── .env.example
```

## Observações

O projeto começou integrando a **API do Amadeus**, mas ela deixou de oferecer suporte durante o desenvolvimento. A integração foi migrada para a **Duffel API**, mantendo a camada de serviços do backend com o mesmo contrato de dados.

## Roadmap

- [ ] Finalizar o histórico de pesquisas (persistência e integração com a API)
- [ ] Adicionar testes automatizados (backend e frontend)
- [ ] Configurar CI/CD com GitHub Actions
- [ ] Deploy do projeto em ambiente público
- [ ] Suporte a voos de ida e volta

## Licença

Distribuído sob a licença [MIT](LICENSE).