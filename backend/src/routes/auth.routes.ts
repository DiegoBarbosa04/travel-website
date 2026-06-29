import {
  userAuth,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { validateSchema } from "../middlewares/validate.middleware";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validateSchema(registerSchema), userRegister);
router.post("/login", validateSchema(loginSchema), userLogin);
router.get("/me", authMiddleware, userAuth);
router.post("/logout", authMiddleware, userLogout);

export default router;
