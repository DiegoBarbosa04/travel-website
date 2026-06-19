import { Router, type Request, type Response } from "express";
import { userLogin, userRegister } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schema";
import { validateSchema } from "../middlewares/validate.middleware";
import flightRoutes from "./flight.routes";

const router = Router();

router.get("/me", authMiddleware, (req: Request, res: Response) => {
  res.json({
    user: req.user,
  });
});

router.use("/flights", flightRoutes);
router.post("/register", validateSchema(registerSchema), userRegister);
router.post("/login", validateSchema(loginSchema), userLogin);

export default router;
