// src/controllers/ideas.ts
import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from "../generated/prisma";
import { toJsonSafe } from "../utils/jsonBigInt";
import { getClientIp } from "../utils/ip";

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

export const voteForIdea = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const rawId = req.body?.id ?? req.params?.id;
    const ideaId = typeof rawId === "string" ? Number(rawId) : rawId;

    if (!Number.isInteger(ideaId) || ideaId <= 0) {
      return res.status(400).json({
        message:
          "Поле 'id' обязательно и должно быть положительным целым числом.",
      });
    }

    const ip = getClientIp(req);

    const idea = await prisma.idea.findUnique({ where: { id: ideaId } });
    if (!idea) {
      return res.status(404).json({ message: "Идея не найдена." });
    }
    const vote = await prisma.ideaVote.create({
      data: { ip, idea: { connect: { id: ideaId } } },
    });
    // подтягиваем актуальную идею уже без инкремента
    const updatedIdea = await prisma.idea.findUnique({ where: { id: ideaId } });

    return res
      .status(201)
      .json(toJsonSafe({ message: "Голос принят.", vote, idea: updatedIdea }));
  } catch (error: any) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return res
          .status(409)
          .json({ message: "Вы уже голосовали за эту идею с данного IP." });
      }
      if (error.code === "P2003") {
        return res.status(400).json({
          message: "Невозможно создать голос: некорректная ссылка на идею.",
        });
      }
    }
    return next(error);
  }
};
