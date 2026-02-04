import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "../shared/routes";
import { z } from "zod";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function deleteFromCloudinary(imageUrl: string) {
  try {
    const parts = imageUrl.split("/");
    const filename = parts[parts.length - 1];
    const publicId = `tactic-lab/${filename.split(".")[0]}`;
    await cloudinary.uploader.destroy(publicId);
  } catch (e) {
    console.error("Cloudinary delete error:", e);
  }
}

const storageEngine = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "tactic-lab",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
    transformation: [{ width: 1200, crop: "limit", quality: "auto" }],
  } as any,
});

const upload = multer({
  storage: storageEngine,
  limits: { fileSize: 10 * 1024 * 1024 },
});

function createCleanSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export async function registerRoutes(
  _httpServer: Server,
  app: Express
): Promise<Server> {

  app.get(api.posts.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const posts = await storage.getPosts(category);
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ message: "Post not found" });
    await storage.incrementViewCount(post.id);
    res.json(post);
  });

  app.get("/api/posts/id/:id", async (req, res) => {
    const id = Number(req.params.id);
    const post = await storage.getPostById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  app.post(api.posts.create.path, async (req, res) => {
    try {
      const input = api.posts.create.input.parse(req.body);
      let slug = createCleanSlug(input.title);
      let counter = 1;

      while (await storage.getPostBySlug(slug)) {
        slug = `${slug}-${counter++}`;
      }

      const post = await storage.createPost({ ...input, slug } as any);
      res.status(201).json(post);
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({ message: e.errors[0].message });
      }
      res.status(500).json({ message: "Create post failed" });
    }
  });

  app.put("/api/posts/:id", async (req, res) => {
    const id = Number(req.params.id);
    const input = api.posts.update.input.parse(req.body);
    const post = await storage.updatePost(id, input as any);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  app.delete("/api/posts/:id", async (req, res) => {
    const id = Number(req.params.id);
    const post = await storage.getPostById(id);
    if (post?.imageUrl) await deleteFromCloudinary(post.imageUrl);
    await storage.deletePost(id);
    res.json({ success: true });
  });

  app.post("/api/upload", upload.single("image"), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file" });
    const url = (req.file as any).path;
    res.json({ success: 1, file: { url }, url });
  });

  return _httpServer;
}
