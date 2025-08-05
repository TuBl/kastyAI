"use client";

import { trpc } from "@/app/_trpc/client";
import { useState } from "react";

export default function ClientRagForm() {
  const [query, setQuery] = useState("");

  const chunksQuery = trpc.rag.getRelevantChunks.useQuery(
    { query, threshold: 1.2 },
    {
      enabled: false, 
      refetchOnMount: false,
      refetchOnReconnect: false,
    }
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length > 0) {
      chunksQuery.refetch();
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">RAG Test</h1>
      <form onSubmit={onSubmit} className="mb-4">
        <input
          className="border p-2 w-full"
          placeholder="Enter your question"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Search
        </button>
      </form>

      {chunksQuery.isLoading && <p>Loading...</p>}

      {chunksQuery.data && chunksQuery.data.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Relevant Chunks:</h2>
          <ul className="list-disc pl-5 space-y-2">
            {chunksQuery.data.map((chunk, i) => (
              <li key={i}>{chunk}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
