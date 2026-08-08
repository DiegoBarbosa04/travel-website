import { Router } from "express";
import { testDuffel } from "../controllers/test.controller";

const router = Router();

router.get("/duffel", testDuffel);

export default router;
