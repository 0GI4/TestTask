import React, { useEffect, useState } from "react";
import "./App.css";
import IdeaList from "./components/IdeaList";
import Header from "./components/Header";
import { SortKey } from "./components/Dropdown";
import { Idea } from "./types";
import { getIdeas } from "./api/ideas";

function App() {
  const [sort, setSort] = useState<SortKey>("popular");
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        const data = await getIdeas(sort, controller.signal);
        setIdeas(data);
      } catch (e) {
        if ((e as any)?.name === "AbortError") return;
        setError(e instanceof Error ? e.message : String(e));
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, [sort, setSort]);

  return (
    <div className="App">
      <Header sort={sort} setSort={setSort} />
      <IdeaList
        ideas={ideas}
        setIdeas={setIdeas}
        loading={loading}
        error={error}
      />
    </div>
  );
}

export default App;
