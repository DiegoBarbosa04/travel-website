import { Router } from "express";
import flightRoutes from "./flight.routes";
import authRoutes from "./auth.routes";
import locationRoutes from "./location.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/locations", locationRoutes);

router.use("/flights", flightRoutes);

export default router;
