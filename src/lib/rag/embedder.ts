import { OpenAIEmbeddings } from "@langchain/openai";

const embedder = new OpenAIEmbeddings({
  modelName: "text-embedding-3-small",
});

export async function embedTextChunks(chunks: string[]): Promise<number[][]> {
  return embedder.embedDocuments(chunks);
}

export async function embedQuery(query: string): Promise<number[]> {
  return embedder.embedQuery(query);
}
