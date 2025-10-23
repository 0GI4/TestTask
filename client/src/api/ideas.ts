import { Idea } from "../types";

export async function getIdeas(signal?: AbortSignal): Promise<Idea[]> {
  const response = await fetch("http://localhost:4000/api/ideas", {
    method: "GET",
    headers: { Accept: "application/json" },
    signal,
  });

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
