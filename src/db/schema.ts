import { boolean, pgTable, serial, text, vector } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey().notNull(),
  content: text("content"),
  done: boolean("done"),
});

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  source: text("source"),
  // 1536 for text-embedding-ada-002
  embedding: vector("embedding", { dimensions: 1536 }),
});
