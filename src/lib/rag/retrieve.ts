import { db } from "@/db";
import { sql } from "drizzle-orm";
import { embedQuery } from "./embedder";

export async function getRelevantChunks(
  query: string,
  k = 3,
  distanceThreshold = 0.8 // optional, you can expose this as a param too
): Promise<string[]> {
  console.log("🔍 Incoming query:", query);

  const queryEmbedding = await embedQuery(query);
  console.log(
    "📐 Query embedding (first 5 dims):",
    queryEmbedding.slice(0, 5),
    "..."
  );

  const vectorLiteral = `ARRAY[${queryEmbedding.join(",")}]::vector`;

  const results = (await db.execute(
    sql.raw(`
      SELECT content, embedding <-> ${vectorLiteral} as distance
      FROM documents
      ORDER BY distance
      LIMIT ${k};
    `)
  )) as { rows: { content: string; distance: number }[] };

  console.log("📊 Retrieved results:");
  results.rows.forEach((r, i) => {
    console.log(
      `  ${i + 1}. Distance: ${r.distance.toFixed(4)} | ${r.content}`
    );
  });

  const filtered = results.rows.filter((r) => r.distance < distanceThreshold);

  if (filtered.length === 0) {
    console.log(
      `⚠️ No chunks passed the distance threshold of ${distanceThreshold}`
    );
  }

  return filtered.map((r) => r.content);
}
