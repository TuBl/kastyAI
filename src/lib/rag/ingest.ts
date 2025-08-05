import { db } from "@/db";
import { documents } from "@/db/schema";
import { splitText } from "./chunker";
import { embedTextChunks } from "./embedder";

export async function ingestText(rawText: string, source: string) {
  const chunks = await splitText(rawText);
  const embeddings = await embedTextChunks(chunks);

  await db.insert(documents).values(
    chunks.map((chunk, i) => ({
      content: chunk,
      source,
      embedding: embeddings[i],
    }))
  );
}
