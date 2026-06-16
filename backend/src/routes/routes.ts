import { Router, type Request, type Response } from "express";
import { userLogin, userRegister } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get("/me", authMiddleware, (req: Request, res: Response) => {
  res.json({
    user: req.user,
  });
});

router.post("/register", userRegister);
router.post("/login", userLogin);

export default router;
