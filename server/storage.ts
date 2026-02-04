import { db } from "./db";
import {
  posts,
  scoutProfiles,
  type Post,
  type ScoutProfile,
  type CreatePostRequest,
  type PostWithProfile
} from "../shared/schema";
import { eq, desc, sql } from "drizzle-orm";

export interface IStorage {
  getPosts(category?: string): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<PostWithProfile | undefined>;
  getPostById(id: number): Promise<PostWithProfile | undefined>;
  createPost(post: CreatePostRequest): Promise<Post>;
  updatePost(id: number, post: Partial<CreatePostRequest>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;
  incrementViewCount(id: number): Promise<void>;
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
    const [profile] = await db.select().from(scoutProfiles).where(eq(scoutProfiles.postId, post.id));
    return { ...post, scoutProfile: profile };
  }

  async createPost(input: CreatePostRequest): Promise<Post> {
    const { scoutProfile, ...postData } = input;
    const [post] = await db.insert(posts).values(postData as any).returning();

    if (scoutProfile) {
      await db.insert(scoutProfiles).values({ ...scoutProfile, postId: post.id } as any);
    }
    return post;
  }

  async getPostById(id: number): Promise<PostWithProfile | undefined> {
    const [post] = await db.select().from(posts).where(eq(posts.id, id));
    if (!post) return undefined;
    const [profile] = await db.select().from(scoutProfiles).where(eq(scoutProfiles.postId, post.id));
    return { ...post, scoutProfile: profile };
  }

  async updatePost(id: number, input: Partial<CreatePostRequest>): Promise<Post | undefined> {
    const { scoutProfile, ...postData } = input;
    const [updatedPost] = await db.update(posts).set(postData as any).where(eq(posts.id, id)).returning();

    if (!updatedPost) return undefined;

    if (scoutProfile) {
      await db.delete(scoutProfiles).where(eq(scoutProfiles.postId, id));
      await db.insert(scoutProfiles).values({ ...scoutProfile, postId: id } as any);
    }
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    await db.delete(scoutProfiles).where(eq(scoutProfiles.postId, id));
    const result = await db.delete(posts).where(eq(posts.id, id)).returning();
    return result.length > 0;
  }

  async incrementViewCount(id: number): Promise<void> {
    await db.update(posts).set({ views: sql`${posts.views} + 1` }).where(eq(posts.id, id));
  }
}

export const storage = new DatabaseStorage();