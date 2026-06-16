import express from "express";
import router from "./routes/routes";
import cookieParser from "cookie-parser";
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(router);

app.listen(port, () => {
  console.log(`Projeto rodando na ${port}`);
});
