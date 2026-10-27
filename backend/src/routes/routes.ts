import { Router } from "express";
import flightRoutes from "./flight.routes.js";
import authRoutes from "./auth.routes.js";
import locationRoutes from "./location.routes.js";
import reviewRoutes from "./review.routes.js";
import historyRoutes from "./history.routes.js";

const router = Router();

router.use("/auth", authRoutes);

router.use("/locations", locationRoutes);

router.use("/flights", flightRoutes);

router.use("/reviews", reviewRoutes);

router.use("/history", historyRoutes);

export default router;
