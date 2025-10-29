import { Router } from "express";
import {
  getIdeas,
  totalVotesFromIp,
  voteForIdea,
} from "../controllers/ideaController";

const router = Router();

router.get("/ideas", getIdeas);
router.post("/idea/:id", voteForIdea);
router.get("/votes", totalVotesFromIp);

export default router;
