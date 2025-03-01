import { Router } from "express";
import { authcallback } from "../controller/auth.controller.js";

const router = Router();

router.post("/callback",authcallback );

export default router;