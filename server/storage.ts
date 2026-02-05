import { desc, eq, sql } from "drizzle-orm";
import {
  posts,
  scoutProfiles,
  type CreatePostRequest,
  type Post,
  type PostWithProfile,
} from "../shared/schema.js";

export interface IStorage {
  getPosts(category?: string): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<PostWithProfile | undefined>;
  getPostById(id: number): Promise<PostWithProfile | undefined>;
  createPost(input: CreatePostRequest): Promise<Post>;
  updatePost(id: number, input: Partial<CreatePostRequest>): Promise<Post | undefined>;
  deletePost(id: number): Promise<boolean>;
  incrementViewCount(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  private db: any;

  constructor(db: any) {
    this.db = db;
  }

  async getPosts(category?: string): Promise<Post[]> {
    if (category) {
      return await this.db
        .select()
        .from(posts)
        .where(eq(posts.category, category))
        .orderBy(desc(posts.createdAt));
    }
    return await this.db.select().from(posts).orderBy(desc(posts.createdAt));
  }

  async getPostBySlug(slug: string): Promise<PostWithProfile | undefined> {
    const [post] = await this.db.select().from(posts).where(eq(posts.slug, slug));
    if (!post) return undefined;
    const [profile] = await this.db
      .select()
      .from(scoutProfiles)
      .where(eq(scoutProfiles.postId, post.id));
    return { ...post, scoutProfile: profile };
  }

  async createPost(input: CreatePostRequest): Promise<Post> {
    const { scoutProfile, ...postData } = input;
    const [post] = await this.db.insert(posts).values(postData as any).returning();

    if (scoutProfile) {
      await this.db
        .insert(scoutProfiles)
        .values({ ...scoutProfile, postId: post.id } as any);
    }
    return post;
  }

  async getPostById(id: number): Promise<PostWithProfile | undefined> {
    const [post] = await this.db.select().from(posts).where(eq(posts.id, id));
    if (!post) return undefined;
    const [profile] = await this.db
      .select()
      .from(scoutProfiles)
      .where(eq(scoutProfiles.postId, post.id));
    return { ...post, scoutProfile: profile };
  }

  async updatePost(id: number, input: Partial<CreatePostRequest>): Promise<Post | undefined> {
    const { scoutProfile, ...postData } = input;
    const [updatedPost] = await this.db
      .update(posts)
      .set(postData as any)
      .where(eq(posts.id, id))
      .returning();

    if (!updatedPost) return undefined;

    if (scoutProfile) {
      await this.db.delete(scoutProfiles).where(eq(scoutProfiles.postId, id));
      await this.db
        .insert(scoutProfiles)
        .values({ ...scoutProfile, postId: id } as any);
    }
    return updatedPost;
  }

  async deletePost(id: number): Promise<boolean> {
    await this.db.delete(scoutProfiles).where(eq(scoutProfiles.postId, id));
    const result = await this.db.delete(posts).where(eq(posts.id, id)).returning();
    return result.length > 0;
  }

  async incrementViewCount(id: number): Promise<void> {
    await this.db.update(posts).set({ views: sql`${posts.views} + 1` }).where(eq(posts.id, id));
  }
}
