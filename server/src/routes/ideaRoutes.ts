import { Router } from "express";
import { getIdeas, voteForIdea } from "../controllers/ideaController";

const router = Router();

router.use((req, _res, next) => {
  console.log(
    `[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ua=${
      req.headers["user-agent"]
    }`
  );
  next();
});

router.get("/ideas", getIdeas);
router.post("/idea/:id", voteForIdea);

export default router;
