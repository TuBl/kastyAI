import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const todos = pgTable("todos", {
  id: serial("id").primaryKey().notNull(),
  content: text("content"),
  done: boolean("done"),
});
