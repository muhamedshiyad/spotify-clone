import { Router } from "express";
import { protectRouter} from "../middleware/ath.middleware.js";
import { getAllUsers, getMessage } from "../controller/user.controller.js";

const router = Router();

router.get("/",protectRouter,getAllUsers);

export  default router;