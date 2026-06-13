import { Router, type Request, type Response } from "express";
import { userLogin, userRegister } from "../controllers/auth.controller";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.post("/register", userRegister);
router.post("/login", userLogin);

export default router;
