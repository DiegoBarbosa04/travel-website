import {
  userAuth,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/auth.controller.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), userRegister);
router.post("/login", validateSchema(loginSchema), userLogin);
router.get("/me", authMiddleware, userAuth);
router.post("/logout", authMiddleware, userLogout);

export default router;
