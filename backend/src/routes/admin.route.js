import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js";
import { protectRouter, requireAdmin } from "../middleware/ath.middleware.js";

const router = Router();

router.get("/check",protectRouter,requireAdmin,checkAdmin);

router.post("/songs",protectRouter,requireAdmin,createSong );
router.delete("/songs/:id",protectRouter,requireAdmin,deleteSong);

router.post("/albums",protectRouter,requireAdmin,createAlbum );
router.delete("/albums/:id",protectRouter,requireAdmin,deleteAlbum);

export default router;