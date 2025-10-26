import { Router } from "express";
import { getIdeas, voteForIdea } from "../controllers/ideaController";

const router = Router();

router.get("/ideas", getIdeas);
router.post('/idea/:id', voteForIdea)

export default router;
