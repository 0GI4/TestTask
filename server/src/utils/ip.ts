import { Request } from "express";

export function getClientIp(req: Request): string {
  const xff = req.headers["x-forwarded-for"];
  const candidate =
    (Array.isArray(xff) ? xff[0] : xff)?.split(",")[0].trim() ||
    req.ip ||
    req.socket?.remoteAddress ||
    "";

  if (candidate.startsWith("::ffff:")) return candidate.slice(7); // IPv4-mapped IPv6
  if (candidate === "::1") return "127.0.0.1"; // localhost
  return candidate;
}
