import "dotenv/config";
import { db } from "@/db";
import { embedQuery } from "@/lib/rag/embedder";
import { documents } from "@/db/schema";

const rawDocuments = [
    { content: "Cats are small, carnivorous mammals that are often kept as pets." },
    { content: "Domestic cats are known for their agility, curiosity, and playful behavior." },
    { content: "Cats communicate using vocalizations, body language, and scent marking." },
];

const seed = async () => {
  for (const doc of rawDocuments) {
    const embedding = await embedQuery(doc.content);
    await db.insert(documents).values({ content: doc.content, embedding });
  }

  console.log("✅ Seeded test documents");
};

seed().catch((err) => {
  console.error("❌ Failed to seed", err);
  process.exit(1);
});
