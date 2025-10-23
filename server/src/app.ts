import express from "express";
import ideaRoutes from "./routes/ideaRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.set("trust proxy", true);

app.use("/api", ideaRoutes);

app.use(errorHandler);

export default app;
