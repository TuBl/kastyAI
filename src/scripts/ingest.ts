import fs from "fs/promises";
import { ingestText } from "@/lib/rag/ingest";

const path = process.argv[2];

async function main() {
  const raw = await fs.readFile(path, "utf8");
  await ingestText(raw, path);
  console.log("Ingestion complete");
}

main();
