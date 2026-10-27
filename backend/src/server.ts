import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import routes from "./routes/routes.js";
import { openApiDocument } from "./docs/openapi.js";

const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.get("/docs/openapi.json", (req, res) => {
  res.json(openApiDocument);
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use(routes);

app.listen(port, () => {
  console.log(`Projeto rodando na ${port}`);
});
