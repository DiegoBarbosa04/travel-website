import { Router } from "express";
import flightRoutes from "./flight.routes";
import authRoutes from "./auth.routes";
import locationRoutes from "./location.routes";
import reviewRoutes from "./review.routes";

const router = Router();

router.use("/auth", authRoutes);

router.use("/locations", locationRoutes);

router.use("/flights", flightRoutes);

router.use("/reviews", reviewRoutes);

export default router;
