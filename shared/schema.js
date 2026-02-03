import { pgTable, text, serial, timestamp, integer, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    slug: text("slug").notNull().unique(),
    title: text("title").notNull(),
    summary: text("summary").notNull(),
    content: jsonb("content").$type().notNull(),
    category: text("category").notNull(),
    imageUrl: text("image_url"),
    views: integer("views").default(0).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
});
export const scoutProfiles = pgTable("scout_profiles", {
    id: serial("id").primaryKey(),
    postId: integer("post_id").references(() => posts.id).notNull(),
    playerName: text("player_name").notNull(),
    age: integer("age").notNull(),
    position: text("position").notNull(),
    role: text("role").notNull(),
    strengths: jsonb("strengths").$type().notNull(),
    risks: jsonb("risks").$type().notNull(),
});
// === BASE SCHEMAS ===
export const insertPostSchema = createInsertSchema(posts).omit({ id: true, createdAt: true, views: true });
export const insertScoutProfileSchema = createInsertSchema(scoutProfiles).omit({ id: true });
