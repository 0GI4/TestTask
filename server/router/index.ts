import { Request } from "express";
import { PrismaClient } from "../generated/prisma";
import cors from "cors";

const express = require("express");

const app = express();
const prisma = new PrismaClient();
const PORT = Number(process.env.Port || 4000);

app.use(cors());
app.use(express.json());

app.set("trust proxy", true);

function getClientIp(req: Request): string {
  const ip = req.ip || "";

  return ip.startsWith("::ffff:") ? ip.slice(7) : ip;
}
