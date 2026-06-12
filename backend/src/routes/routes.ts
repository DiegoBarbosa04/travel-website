import { Router, type Request, type Response } from "express";
import { userRegister } from "../controllers/userController";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.post("/register", userRegister);

export default router;
