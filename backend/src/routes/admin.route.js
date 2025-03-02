import { Router } from "express";
import { createSong } from "../controller/admin.controller.js";
import { protectRouter, requireAdmin } from "../middleware/ath.middleware.js";

const router = Router();

router.post("/songs",protectRouter,requireAdmin,createSong );

export default router;