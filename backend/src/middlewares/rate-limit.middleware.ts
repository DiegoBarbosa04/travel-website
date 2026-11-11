import type { Request } from "express";
import { ipKeyGenerator, rateLimit, type Options } from "express-rate-limit";

// Store em memória: os contadores zeram ao reiniciar e não são compartilhados
// entre instâncias. Com mais de uma instância, troque por um store compartilhado (ex.: Redis).

const MINUTE = 60 * 1000;

const createLimiter = (
  windowMs: number,
  limit: number,
  message: string,
  options: Partial<Options> = {},
) =>
  rateLimit({
    windowMs,
    limit,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    message: { message },
    ...options,
  });

// Rotas autenticadas contam por usuário; sem sessão, cai no IP.
const userKey = (req: Request) =>
  req.user?.id ? `user:${req.user.id}` : ipKeyGenerator(req.ip ?? "");

// Teto geral por IP, aplicado a toda a API. Os limites específicos abaixo são mais rígidos.
export const globalLimiter = createLimiter(
  15 * MINUTE,
  1000,
  "Muitas requisições. Tente novamente em alguns minutos.",
);

// Login com senha e com Google: conta só as tentativas que falham.
export const loginLimiter = createLimiter(
  15 * MINUTE,
  10,
  "Muitas tentativas de login. Tente novamente em 15 minutos.",
  { skipSuccessfulRequests: true },
);

export const registerLimiter = createLimiter(
  60 * MINUTE,
  5,
  "Muitos cadastros a partir desta rede. Tente novamente mais tarde.",
);

// Cada busca chama a Duffel e a API de câmbio.
export const flightSearchLimiter = createLimiter(
  MINUTE,
  20,
  "Muitas buscas de voos. Aguarde um minuto e tente novamente.",
);

// Autocomplete: o frontend já faz debounce, então o limite é mais folgado.
export const locationSearchLimiter = createLimiter(
  MINUTE,
  60,
  "Muitas buscas de localidades. Aguarde um minuto e tente novamente.",
);

// Criar, editar e apagar avaliações.
export const reviewWriteLimiter = createLimiter(
  60 * MINUTE,
  20,
  "Muitas alterações em avaliações. Tente novamente mais tarde.",
  { keyGenerator: userKey },
);

// O frontend registra uma entrada a cada busca de voos.
export const historyWriteLimiter = createLimiter(
  MINUTE,
  30,
  "Muitas pesquisas registradas. Aguarde um minuto e tente novamente.",
  { keyGenerator: userKey },
);
