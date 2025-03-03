import { Router} from "express";
import { getAllsongs, getFeaturedSongs, getMadeForYouSongs, getTrendigSongs } from "../controller/song.controller.js";
import { protectRouter, requireAdmin } from "../middleware/ath.middleware.js";

const router = Router();

router.get("/",protectRouter,requireAdmin,getAllsongs);
router.get("/featured",getFeaturedSongs);
router.get("/made-for-you",getMadeForYouSongs);
router.get("/trending",getTrendigSongs);

export default router;