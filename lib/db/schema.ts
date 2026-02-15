import {
  pgTable,
  text,
  timestamp,
  integer,
  uuid,
  serial,
} from "drizzle-orm/pg-core";


export const folders = pgTable("folders", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),

  parentId: uuid("parent_id"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const files = pgTable("files", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: text("name").notNull(),

  content: text("content").default(""),

  folderId: uuid("folder_id"),

  createdAt: timestamp("created_at").defaultNow(),
});

export const tasks = pgTable("tasks", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),

  status: text("status").notNull(), 
  // "done" | "progress" | "todo" | "blocked"

  order: integer("order").notNull(),

  fileId: uuid("file_id"),

  createdAt: timestamp("created_at").defaultNow(),

  completedAt: timestamp("completed_at"),
});

export const nodes = pgTable("nodes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // Dosya veya Klasör adı
  content: text("content"), // Sadece dosyalar için .txt içeriği
  type: text("type").$type<"file" | "folder">().notNull(),
  parentId: integer("parent_id"), // Klasör içindeyse klasörün ID'si
  
  // Timeline ve Durum özellikleri
  status: text("status").$type<"completed" | "in_progress" | "todo" | "backlog">().default("todo"),
  order: integer("order"), // Timeline üzerindeki sırası
  
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
