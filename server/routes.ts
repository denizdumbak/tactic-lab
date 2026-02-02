import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + path.extname(file.originalname));
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 }
});

function createCleanSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  
  app.get(api.posts.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const posts = await storage.getPosts(category);
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  app.post(api.posts.create.path, async (req, res) => {
    try {
      const input = api.posts.create.input.parse(req.body);
      let baseSlug = createCleanSlug(input.title);
      let finalSlug = baseSlug;
      let counter = 1;
      
      while (await storage.getPostBySlug(finalSlug)) {
        finalSlug = `${baseSlug}-${counter}`;
        counter++;
      }

      // TypeScript hatasını önlemek için objeyi güvenli şekilde oluşturuyoruz
      const postData = {
        ...input,
        slug: finalSlug
      };

      const post = await storage.createPost(postData as any);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.get('/api/posts/id/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const post = await storage.getPostById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  app.put('/api/posts/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const input = api.posts.update.input.parse(req.body);
      const post = await storage.updatePost(id, input as any);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  app.delete('/api/posts/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const success = await storage.deletePost(id);
    if (!success) return res.status(404).json({ message: "Post not found" });
    res.json({ success: true });
  });

  app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    res.json({ success: true, url: `/uploads/${req.file.filename}` });
  });

  app.use('/uploads', (await import('express')).default.static(uploadDir));
  return httpServer;
}