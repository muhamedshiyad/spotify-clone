import { Router } from "express";
import { protectRouter, requireAdmin } from "../middleware/ath.middleware.js";
import { getStats } from "../controller/stat.controller.js";

const router = Router();

router.get("/",protectRouter,requireAdmin,getStats);

export default router;