import { Router } from "express";
import { searchFlights } from "../controllers/flight.controller.js";
import { searchFlightsSchema } from "../schemas/flight.schema.js";
import { validateSchema } from "../middlewares/validate.middleware.js";

const router = Router();
router.get(
  "/search",
  validateSchema(searchFlightsSchema, "query"),
  searchFlights,
);

export default router;
