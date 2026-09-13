import { Router } from "express";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { searchLocations } from "../controllers/location.controller.js";
import { searchLocationSchema } from "../schemas/location.schema.js";

const router = Router();

router.get(
  "/search",
  validateSchema(searchLocationSchema, "query"),
  searchLocations,
);

export default router;
