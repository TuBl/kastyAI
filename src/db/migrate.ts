import "dotenv/config";

import { migrate } from "drizzle-orm/neon-http/migrator";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@/db/schema";

const main = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be a Neon postgres connection string");
  }

  const sql = neon(process.env.DATABASE_URL);
  const db = drizzle(sql, { schema });
  await migrate(db, { migrationsFolder: "drizzle" });
  console.log("✅ Migrations complete");
};

main().catch((err) => {
  console.error("❌ Migration failed", err);
  process.exit(1);
});
