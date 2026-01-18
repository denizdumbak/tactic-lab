
import { pgTable, text, serial, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===
export interface EditorJSBlock {
  id?: string;
  type: string;
  data: Record<string, any>;
}

export interface EditorJSContent {
  time?: number;
  blocks: EditorJSBlock[];
  version?: string;
}

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: jsonb("content").$type<EditorJSContent>().notNull(),
  category: text("category").notNull(), // 'scout', 'taktik', 'mac-analizi'
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const scoutProfiles = pgTable("scout_profiles", {
  id: serial("id").primaryKey(),
  postId: integer("post_id").references(() => posts.id).notNull(),
  playerName: text("player_name").notNull(),
  age: integer("age").notNull(),
  position: text("position").notNull(),
  role: text("role").notNull(),
  strengths: jsonb("strengths").$type<string[]>().notNull(),
  risks: jsonb("risks").$type<string[]>().notNull(),
});

// === BASE SCHEMAS ===
export const insertPostSchema = createInsertSchema(posts).omit({ id: true, createdAt: true });
export const insertScoutProfileSchema = createInsertSchema(scoutProfiles).omit({ id: true });

// === EXPLICIT API CONTRACT TYPES ===
export type Post = typeof posts.$inferSelect;
export type InsertPost = z.infer<typeof insertPostSchema>;
export type ScoutProfile = typeof scoutProfiles.$inferSelect;
export type InsertScoutProfile = z.infer<typeof insertScoutProfileSchema>;

export type CreatePostRequest = InsertPost & { scoutProfile?: InsertScoutProfile };
export type PostWithProfile = Post & { scoutProfile?: ScoutProfile };
