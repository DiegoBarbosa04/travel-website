import { Router } from "express";
import flightRoutes from "./flight.routes";
import authRoutes from "./auth.routes";
//import locationRoutes from "./location.routes";
import reviewRoutes from "./review.routes";
import testRoutes from "./test.routes";

const router = Router();

router.use("/auth", authRoutes);

//router.use("/locations", locationRoutes);

router.use("/flights", flightRoutes);

router.use("/reviews", reviewRoutes);

router.use("/test", testRoutes);

export default router;
