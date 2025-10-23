import { Router } from "express";
import { getIdeas } from "../controllers/ideaController";

const router = Router();

router.get("/", getIdeas);

export default router;
