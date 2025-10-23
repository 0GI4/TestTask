import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export const getIdeas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const ideas = await prisma.idea.findMany();
    res.status(200).json(ideas);
  } catch (error) {
    next(error);
  }
};
