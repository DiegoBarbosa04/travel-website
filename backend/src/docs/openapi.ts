import { z } from "zod";
import {
  googleLoginSchema,
  loginSchema,
  registerSchema,
} from "../schemas/auth.schema.js";
import { createReviewSchema } from "../schemas/review.schema.js";
import { historySchema } from "../schemas/history.schema.js";

// Reaproveita os schemas Zod dos corpos de requisição para a doc não ficar defasada.
// `io: "input"` descreve o que o cliente envia (campos com default ficam opcionais).
const toJsonSchema = (schema: z.ZodType) => {
  const { $schema, ...jsonSchema } = z.toJSONSchema(schema, { io: "input" });
  return jsonSchema;
};

const jsonContent = (schema: object) => ({
  "application/json": { schema },
});

const ref = (name: string) => ({ $ref: `#/components/schemas/${name}` });

const response = (description: string, schema: object) => ({
  description,
  content: jsonContent(schema),
});

const responseRef = (name: string) => ({
  $ref: `#/components/responses/${name}`,
});

const cookieAuth = [{ cookieAuth: [] }];
const publicRoute: never[] = [];

export const openApiDocument = {
  openapi: "3.1.0",
  info: {
    title: "Travel Website API",
    version: "1.0.0",
    license: { name: "ISC", identifier: "ISC" },
    description:
      "API de busca de voos, autenticação, avaliações e histórico de pesquisas. " +
      "A autenticação usa um JWT " +
      "enviado no cookie `user` (válido por 5h), definido pelas rotas de login. " +
      "Pelo Swagger UI, faça login primeiro: o navegador guarda o cookie e o envia " +
      "nas rotas protegidas.",
  },
  servers: [{ url: "http://localhost:3000", description: "Desenvolvimento" }],
  tags: [
    { name: "Auth", description: "Cadastro, login e sessão do usuário" },
    { name: "Locations", description: "Autocomplete de aeroportos e cidades" },
    { name: "Flights", description: "Busca de ofertas de voos" },
    { name: "Reviews", description: "Avaliações dos usuários" },
    { name: "History", description: "Histórico de pesquisas do usuário logado" },
  ],
  paths: {
    "/auth/register": {
      post: {
        tags: ["Auth"],
        summary: "Cadastra um novo usuário",
        operationId: "registerUser",
        security: publicRoute,
        requestBody: {
          required: true,
          content: jsonContent(ref("RegisterRequest")),
        },
        responses: {
          201: response("Usuário criado", ref("Message")),
          400: responseRef("ValidationError"),
          409: response("Email já cadastrado", ref("Message")),
          500: responseRef("ServerError"),
        },
      },
    },
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "Login com email e senha",
        description: "Em caso de sucesso, define o cookie de sessão `user`.",
        operationId: "loginUser",
        security: publicRoute,
        requestBody: {
          required: true,
          content: jsonContent(ref("LoginRequest")),
        },
        responses: {
          200: {
            ...response("Usuário autenticado", ref("User")),
            headers: { "Set-Cookie": { $ref: "#/components/headers/SessionCookie" } },
          },
          400: responseRef("ValidationError"),
          401: response("Credenciais inválidas", ref("Message")),
          500: responseRef("ServerError"),
        },
      },
    },
    "/auth/google": {
      post: {
        tags: ["Auth"],
        summary: "Login com Google",
        description:
          "Recebe o ID token do Google Identity Services, valida e cria/vincula o " +
          "usuário pelo email. Em caso de sucesso, define o cookie de sessão `user`.",
        operationId: "loginWithGoogle",
        security: publicRoute,
        requestBody: {
          required: true,
          content: jsonContent(ref("GoogleLoginRequest")),
        },
        responses: {
          200: {
            ...response("Usuário autenticado", ref("User")),
            headers: { "Set-Cookie": { $ref: "#/components/headers/SessionCookie" } },
          },
          400: responseRef("ValidationError"),
          401: response(
            "Credencial do Google inválida ou email não verificado",
            ref("Message"),
          ),
          500: response(
            "Erro no servidor ou login com Google não configurado",
            ref("Message"),
          ),
        },
      },
    },
    "/auth/me": {
      get: {
        tags: ["Auth"],
        summary: "Retorna o usuário da sessão atual",
        operationId: "getCurrentUser",
        security: cookieAuth,
        responses: {
          200: response("Usuário autenticado", ref("User")),
          401: responseRef("Unauthorized"),
          500: responseRef("ServerError"),
        },
      },
    },
    "/auth/logout": {
      post: {
        tags: ["Auth"],
        summary: "Encerra a sessão",
        description: "Remove o cookie de sessão `user`.",
        operationId: "logoutUser",
        security: cookieAuth,
        responses: {
          200: response("Sessão encerrada", ref("Message")),
          401: responseRef("Unauthorized"),
          500: responseRef("ServerError"),
        },
      },
    },
    "/locations/search": {
      get: {
        tags: ["Locations"],
        summary: "Busca aeroportos e cidades",
        operationId: "searchLocations",
        security: publicRoute,
        parameters: [
          {
            name: "keyword",
            in: "query",
            required: true,
            description: "Termo de busca (nome da cidade, aeroporto ou código IATA)",
            schema: { type: "string", minLength: 2 },
            example: "São Paulo",
          },
        ],
        responses: {
          200: response("Locais encontrados", {
            type: "array",
            items: ref("Location"),
          }),
          400: responseRef("ValidationError"),
          500: response("Erro ao consultar a Duffel", ref("Message")),
        },
      },
    },
    "/flights/search": {
      get: {
        tags: ["Flights"],
        summary: "Busca ofertas de voos só de ida",
        description:
          "Retorna até 30 ofertas da Duffel com preços convertidos de USD para BRL.",
        operationId: "searchFlights",
        security: publicRoute,
        parameters: [
          {
            name: "origin",
            in: "query",
            required: true,
            description: "Código IATA de origem",
            schema: { type: "string", minLength: 3, maxLength: 3 },
            example: "GRU",
          },
          {
            name: "destination",
            in: "query",
            required: true,
            description: "Código IATA de destino",
            schema: { type: "string", minLength: 3, maxLength: 3 },
            example: "GIG",
          },
          {
            name: "departureDate",
            in: "query",
            required: true,
            description: "Data de partida (YYYY-MM-DD)",
            schema: { type: "string", format: "date" },
            example: "2026-12-15",
          },
          {
            name: "adults",
            in: "query",
            required: false,
            description: "Quantidade de passageiros adultos",
            schema: { type: "integer", minimum: 1, default: 1 },
          },
        ],
        responses: {
          200: response("Ofertas encontradas", {
            type: "array",
            items: ref("Flight"),
          }),
          400: responseRef("ValidationError"),
          500: response("Erro no servidor", {
            type: "object",
            properties: { error: { type: "string", example: "Erro no servidor" } },
            required: ["error"],
          }),
        },
      },
    },
    "/reviews": {
      get: {
        tags: ["Reviews"],
        summary: "Lista todas as avaliações",
        description: "Ordenadas da mais recente para a mais antiga.",
        operationId: "listReviews",
        security: publicRoute,
        responses: {
          200: response("Avaliações", {
            type: "array",
            items: ref("ReviewWithAuthor"),
          }),
          500: responseRef("ServerError"),
        },
      },
      post: {
        tags: ["Reviews"],
        summary: "Cria uma avaliação",
        operationId: "createReview",
        security: cookieAuth,
        requestBody: {
          required: true,
          content: jsonContent(ref("ReviewRequest")),
        },
        responses: {
          201: response("Avaliação criada", ref("Review")),
          400: responseRef("ValidationError"),
          401: responseRef("Unauthorized"),
          500: responseRef("ServerError"),
        },
      },
    },
    "/reviews/me": {
      get: {
        tags: ["Reviews"],
        summary: "Lista as avaliações do usuário logado",
        operationId: "listMyReviews",
        security: cookieAuth,
        responses: {
          200: response("Avaliações do usuário", {
            type: "array",
            items: ref("Review"),
          }),
          401: responseRef("Unauthorized"),
          500: responseRef("ServerError"),
        },
      },
    },
    "/reviews/{id}": {
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          description: "ID da avaliação",
          schema: { type: "string", format: "uuid" },
        },
      ],
      put: {
        tags: ["Reviews"],
        summary: "Atualiza uma avaliação do usuário logado",
        operationId: "updateReview",
        security: cookieAuth,
        requestBody: {
          required: true,
          content: jsonContent(ref("ReviewRequest")),
        },
        responses: {
          200: response("Avaliação atualizada", ref("Review")),
          400: response(
            "Dados inválidos, avaliação não encontrada ou de outro usuário",
            { oneOf: [ref("ValidationError"), ref("Message")] },
          ),
          401: responseRef("Unauthorized"),
          500: responseRef("ServerError"),
        },
      },
      delete: {
        tags: ["Reviews"],
        summary: "Apaga uma avaliação do usuário logado",
        operationId: "deleteReview",
        security: cookieAuth,
        responses: {
          200: response("Avaliação apagada", ref("Message")),
          400: response(
            "Avaliação não encontrada ou de outro usuário",
            ref("Message"),
          ),
          401: responseRef("Unauthorized"),
          500: responseRef("ServerError"),
        },
      },
    },
    "/history": {
      get: {
        tags: ["History"],
        summary: "Lista o histórico de pesquisas do usuário logado",
        description:
          "Retorna as 10 pesquisas mais recentes, da mais nova para a mais antiga.",
        operationId: "listSearchHistory",
        security: cookieAuth,
        responses: {
          200: response("Histórico de pesquisas", {
            type: "array",
            maxItems: 10,
            items: ref("SearchHistory"),
          }),
          401: responseRef("Unauthorized"),
          500: responseRef("ServerError"),
        },
      },
      post: {
        tags: ["History"],
        summary: "Registra uma pesquisa no histórico",
        description:
          "Guarda no máximo 10 pesquisas por usuário, descartando as mais antigas. " +
          "Repetir uma pesquisa idêntica (mesma origem, destino, data e adultos) " +
          "não duplica a entrada: ela só volta para o topo.",
        operationId: "addSearchHistory",
        security: cookieAuth,
        requestBody: {
          required: true,
          content: jsonContent(ref("SearchHistoryRequest")),
        },
        responses: {
          201: response("Pesquisa registrada", ref("SearchHistory")),
          400: responseRef("ValidationError"),
          401: responseRef("Unauthorized"),
          500: responseRef("ServerError"),
        },
      },
    },
  },
  components: {
    securitySchemes: {
      cookieAuth: {
        type: "apiKey",
        in: "cookie",
        name: "user",
        description: "JWT de sessão definido por `/auth/login` ou `/auth/google`",
      },
    },
    headers: {
      SessionCookie: {
        description: "Cookie `user` com o JWT de sessão (expira em 5h)",
        schema: { type: "string", example: "user=eyJhbGciOi...; Max-Age=18000; Path=/" },
      },
    },
    responses: {
      ValidationError: response("Dados de entrada inválidos", ref("ValidationError")),
      Unauthorized: response("Sessão ausente ou inválida", ref("Message")),
      ServerError: response("Erro no servidor", ref("Message")),
    },
    schemas: {
      RegisterRequest: toJsonSchema(registerSchema),
      LoginRequest: toJsonSchema(loginSchema),
      GoogleLoginRequest: toJsonSchema(googleLoginSchema),
      // Criação e edição usam o mesmo formato
      ReviewRequest: toJsonSchema(createReviewSchema),
      SearchHistoryRequest: toJsonSchema(historySchema),
      Message: {
        type: "object",
        properties: { message: { type: "string" } },
        required: ["message"],
      },
      ValidationError: {
        type: "object",
        description: "Erros do Zod no formato `flatten()`",
        properties: {
          errors: {
            type: "object",
            properties: {
              formErrors: { type: "array", items: { type: "string" } },
              fieldErrors: {
                type: "object",
                additionalProperties: { type: "array", items: { type: "string" } },
              },
            },
            required: ["formErrors", "fieldErrors"],
          },
        },
        required: ["errors"],
        example: {
          errors: {
            formErrors: [],
            fieldErrors: { email: ["Email inválido"] },
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          firstName: { type: "string", example: "Maria" },
          lastName: { type: "string", example: "Silva" },
          email: { type: "string", format: "email", example: "maria@email.com" },
        },
        required: ["id", "firstName", "lastName", "email"],
      },
      Location: {
        type: "object",
        properties: {
          id: { type: "string", example: "arp_gru_br" },
          name: { type: "string", example: "Aeroporto Internacional de Guarulhos" },
          type: { type: "string", enum: ["airport", "city"] },
          iataCode: { type: "string", example: "GRU" },
          cityName: { type: ["string", "null"], example: "São Paulo" },
          countryCode: { type: "string", example: "BR" },
        },
        required: ["id", "name", "type", "iataCode", "cityName", "countryCode"],
      },
      Flight: {
        type: "object",
        properties: {
          id: { type: "string", description: "ID da oferta na Duffel" },
          airline: { type: "string", example: "LATAM Airlines" },
          carrierCode: { type: "string", example: "LA" },
          logo: { type: "string", format: "uri" },
          flightNumber: { type: "string", example: "LA 3456" },
          cabin: { type: ["string", "null"], example: "Economy" },
          aircraft: { type: ["string", "null"], example: "Airbus A320" },
          departureTime: { type: "string", format: "date-time" },
          departureCity: { type: "string", example: "São Paulo" },
          departureAirport: { type: "string" },
          departureTerminal: { type: ["string", "null"] },
          arrivalTime: { type: "string", format: "date-time" },
          arrivalCity: { type: "string", example: "Rio de Janeiro" },
          arrivalAirport: { type: "string" },
          arrivalTerminal: { type: ["string", "null"] },
          origin: { type: "string", example: "GRU" },
          destination: { type: "string", example: "GIG" },
          duration: {
            type: ["string", "null"],
            description: "Duração em ISO 8601",
            example: "PT1H5M",
          },
          stops: {
            type: "array",
            description: "Códigos IATA das conexões",
            items: { type: "string" },
          },
          baggage: {
            type: "object",
            properties: {
              carryOn: { type: "integer", minimum: 0 },
              checked: { type: "integer", minimum: 0 },
            },
            required: ["carryOn", "checked"],
          },
          price: { type: "number", description: "Preço total em BRL" },
          basePrice: { type: ["number", "null"], description: "Tarifa base em BRL" },
          taxes: { type: ["number", "null"], description: "Taxas em BRL" },
          currency: {
            type: "string",
            description: "Moeda original da oferta na Duffel",
            example: "USD",
          },
        },
        required: [
          "id",
          "airline",
          "carrierCode",
          "logo",
          "flightNumber",
          "cabin",
          "aircraft",
          "departureTime",
          "departureCity",
          "departureAirport",
          "departureTerminal",
          "arrivalTime",
          "arrivalCity",
          "arrivalAirport",
          "arrivalTerminal",
          "origin",
          "destination",
          "duration",
          "stops",
          "baggage",
          "price",
          "basePrice",
          "taxes",
          "currency",
        ],
      },
      Review: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          text: { type: "string", example: "Ótima experiência!" },
          rating: { type: "integer", minimum: 1, maximum: 5, example: 5 },
          userId: { type: "string", format: "uuid" },
          createdAt: { type: "string", format: "date-time" },
        },
        required: ["id", "text", "rating", "userId", "createdAt"],
      },
      SearchHistory: {
        type: "object",
        properties: {
          id: { type: "string", format: "uuid" },
          origin: { type: "string", example: "GRU" },
          destination: { type: "string", example: "GIG" },
          originName: { type: ["string", "null"], example: "São Paulo" },
          destinationName: { type: ["string", "null"], example: "Rio de Janeiro" },
          departureDate: {
            type: "string",
            format: "date-time",
            example: "2026-12-15T00:00:00.000Z",
          },
          adults: { type: "integer", minimum: 1, maximum: 9, example: 1 },
          userId: { type: "string", format: "uuid" },
          createdAt: {
            type: "string",
            format: "date-time",
            description: "Momento da pesquisa mais recente",
          },
        },
        required: [
          "id",
          "origin",
          "destination",
          "originName",
          "destinationName",
          "departureDate",
          "adults",
          "userId",
          "createdAt",
        ],
      },
      ReviewWithAuthor: {
        allOf: [
          ref("Review"),
          {
            type: "object",
            properties: {
              user: {
                type: "object",
                properties: {
                  firstName: { type: "string" },
                  lastName: { type: "string" },
                },
                required: ["firstName", "lastName"],
              },
            },
            required: ["user"],
          },
        ],
      },
    },
  },
};
