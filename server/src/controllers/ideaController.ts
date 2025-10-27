import { NextFunction, Request, Response } from "express";
import { Prisma, PrismaClient } from "../generated/prisma";
import { SortKey } from "../types";
import { getClientIp } from "../utils/ip";
import { toJsonSafe } from "../utils/jsonBigInt";

const prisma = new PrismaClient();

const SORT_KEYS = ["popular", "new", "alpha"] as const;
const isSortKey = (v: string): v is SortKey =>
  (SORT_KEYS as readonly string[]).includes(v as SortKey);

const ORDER_BY_MAP: Record<SortKey, Prisma.IdeaOrderByWithRelationInput> = {
  popular: { votesCount: "desc" },
  new: { createdAt: "desc" },
  alpha: { title: "asc" },
};

export const getIdeas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const raw = Array.isArray(req.query.sort)
      ? req.query.sort[0]
      : req.query.sort;
    const s = typeof raw === "string" ? raw : "popular";
    const sort: SortKey = isSortKey(s) ? s : "popular";

    const orderBy: Prisma.IdeaOrderByWithRelationInput = ORDER_BY_MAP[sort];

    const ideas = await prisma.idea.findMany({ orderBy });
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

export const totalVotesFromIp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const clientIp = getClientIp(req);

    const total = await prisma.ideaVote.findMany({
      where: { ip: { equals: clientIp } },
    });

    return res.json({
      totalVotes: total.length,
    });
  } catch (error) {
    return next(error);
  }
};
