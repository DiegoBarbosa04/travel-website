import { Router } from "express";
import { searchFlights } from "../controllers/flight.controller";
import { searchFlightsSchema } from "../schemas/flight.schema";
import { validateSchema } from "../middlewares/validate.middleware";

const router = Router();
router.get(
  "/search",
  validateSchema(searchFlightsSchema, "query"),
  searchFlights,
);

export default router;
