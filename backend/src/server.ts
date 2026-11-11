import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import routes from "./routes/routes.js";
import { openApiDocument } from "./docs/openapi.js";
import { globalLimiter } from "./middlewares/rate-limit.middleware.js";

const app = express();
const port = 3000;

// Atrás de proxy reverso (nginx, Cloudflare...), TRUST_PROXY é o número de proxies
// na frente da API, para o rate limit enxergar o IP real do cliente. Sem proxy, fica 0.
app.set("trust proxy", Number.parseInt(process.env.TRUST_PROXY ?? "", 10) || 0);

// CORS antes do rate limit, para o frontend conseguir ler as respostas 429.
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(globalLimiter);
app.use(cookieParser());
app.use(express.json());
app.get("/docs/openapi.json", (req, res) => {
  res.json(openApiDocument);
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use(routes);

app.listen(port, () => {
  console.log(`Projeto rodando na ${port}`);
});
