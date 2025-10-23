import { Router } from "express";
import { getIdeas } from "../controllers/ideaController";

const router = Router();

router.get("/ideas", getIdeas);

export default router;
