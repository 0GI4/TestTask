import { SortKey } from "../components/Dropdown";
import { Idea, VoteErrorResponse, Votes, VoteSuccessResponse } from "../types";

export async function getIdeas(
  sort: SortKey,
  signal?: AbortSignal
): Promise<Idea[]> {
  const response = await fetch(
    `http://localhost:4000/api/ideas?sort=${encodeURIComponent(sort)}`,
    {
      method: "GET",
      headers: { Accept: "application/json" },
      signal,
    }
  );

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      `GET /api/ideas failed: ${response.status} ${response.statusText}${
        text ? ` — ${text}` : ""
      }`
    );
  }

  const data = (await response.json()) as unknown;
  if (!Array.isArray(data)) {
    throw new Error("Unexpected response shape: expected Idea[].");
  }
  return data as Idea[];
}

export async function voteForIdea(id: string): Promise<VoteSuccessResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(`http://localhost:4000/api/idea/${id}`, {
      method: "POST",
      headers: {
        accept: "application/json",
      },
      signal: controller.signal,
    });
    const contentType = response.headers.get("content-type") || "";
    const isJson = contentType.includes("application/json");
    const data = isJson ? await response.json() : null;

    if (response.status === 201) {
      // Успех
      return data as VoteSuccessResponse;
    }

    if (response.status === 409) {
      // Повторный голос с этого IP
      const msg =
        (data as VoteErrorResponse | null)?.message ||
        "Вы уже голосовали за эту идею.";
      throw new Error(msg);
    }

    if (response.status === 404) {
      const msg =
        (data as VoteErrorResponse | null)?.message || "Идея не найдена.";
      throw new Error(msg);
    }

    if (response.status === 400) {
      const msg =
        (data as VoteErrorResponse | null)?.message || "Некорректный запрос.";
      throw new Error(msg);
    }

    const fallback =
      (data as VoteErrorResponse | null)?.message || `HTTP ${response.status}`;
    throw new Error(`Ошибка голосования: ${fallback}`);
  } catch (err) {
    if ((err as Error).name === "AbortError") {
      throw new Error("Таймаут запроса при голосовании.");
    }
    throw err;
  } finally {
    clearTimeout(timeout);
  }
}

export async function getTotalVotes(): Promise<Votes> {
  try {
    const res = await fetch("http://localhost:4000/api/votes");

    return res.json();
  } catch (error) {
    throw error;
  }
}
