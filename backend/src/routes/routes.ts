import { Router } from "express";
import flightRoutes from "./flight.routes";
import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/flights", flightRoutes);

export default router;
