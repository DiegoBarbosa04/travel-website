import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/routes";

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
app.use(routes);

app.listen(port, () => {
  console.log(`Projeto rodando na ${port}`);
});
