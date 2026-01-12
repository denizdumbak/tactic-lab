
import { db } from "./db";
import {
  posts,
  scoutProfiles,
  type Post,
  type InsertPost,
  type ScoutProfile,
  type InsertScoutProfile,
  type CreatePostRequest,
  type PostWithProfile
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getPosts(category?: string): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<PostWithProfile | undefined>;
  createPost(post: CreatePostRequest): Promise<Post>;
}

export class DatabaseStorage implements IStorage {
  async getPosts(category?: string): Promise<Post[]> {
    if (category) {
      return await db.select().from(posts).where(eq(posts.category, category)).orderBy(desc(posts.createdAt));
    }
    return await db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPostBySlug(slug: string): Promise<PostWithProfile | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.slug, slug));
    
    if (!post) return undefined;

    // Fetch associated scout profile if exists
    const [profile] = await db.select().from(scoutProfiles).where(eq(scoutProfiles.postId, post.id));

    return { ...post, scoutProfile: profile };
  }

  async createPost(input: CreatePostRequest): Promise<Post> {
    const { scoutProfile, ...postData } = input;
    
    const [post] = await db.insert(posts).values(postData).returning();

    if (scoutProfile) {
      await db.insert(scoutProfiles).values({
        ...scoutProfile,
        postId: post.id
      });
    }

    return post;
  }
}

export const storage = new DatabaseStorage();
