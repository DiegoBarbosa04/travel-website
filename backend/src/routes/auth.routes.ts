import {
  userAuth,
  userGoogleLogin,
  userLogin,
  userLogout,
  userRegister,
} from "../controllers/auth.controller.js";
import {
  googleLoginSchema,
  loginSchema,
  registerSchema,
} from "../schemas/auth.schema.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  loginLimiter,
  registerLimiter,
} from "../middlewares/rate-limit.middleware.js";

const router = Router();

router.post(
  "/register",
  registerLimiter,
  validateSchema(registerSchema),
  userRegister,
);
router.post("/login", loginLimiter, validateSchema(loginSchema), userLogin);
router.post(
  "/google",
  loginLimiter,
  validateSchema(googleLoginSchema),
  userGoogleLogin,
);
router.get("/me", authMiddleware, userAuth);
router.post("/logout", authMiddleware, userLogout);

export default router;
