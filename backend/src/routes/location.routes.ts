import { Router } from "express";
import { validateSchema } from "../middlewares/validate.middleware";
import { searchLocations } from "../controllers/location.controller";
import { searchLocationSchema } from "../schemas/location.schema";

const router = Router();

router.get(
  "/search",
  validateSchema(searchLocationSchema, "query"),
  searchLocations,
);

export default router;
