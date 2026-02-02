import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage.js";
import { api } from "../shared/routes.js";
import { z } from "zod";
import multer from "multer";
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// 1. Cloudinary Yapılandırması
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME?.trim(),
  api_key: process.env.CLOUDINARY_API_KEY?.trim(),
  api_secret: process.env.CLOUDINARY_API_SECRET?.trim(),
});

// Cloudinary'den resim silme yardımcı fonksiyonu
async function deleteFromCloudinary(imageUrl: string) {
  try {
    const parts = imageUrl.split('/');
    const fileNameWithExtension = parts[parts.length - 1];
    const publicId = `tactic-lab/${fileNameWithExtension.split('.')[0]}`;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary silme hatası:", error);
  }
}

// 2. Cloudinary Storage Ayarları
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tactic-lab',
    allowed_formats: ['jpg', 'png', 'webp', 'jpeg'],
    transformation: [{ width: 1200, crop: 'limit', quality: 'auto' }]
  } as any,
});

const upload = multer({
  storage: cloudinaryStorage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

function createCleanSlug(title: string): string {
  return title
    .replace(/İ/g, 'i').replace(/I/g, 'i').toLowerCase()
    .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
    .replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/-+/g, '-')
    .trim()
    .replace(/^-+|-+$/g, '');
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {

  // Blog postlarını listele
  app.get(api.posts.list.path, async (req, res) => {
    try {
      const category = req.query.category as string | undefined;
      const posts = await storage.getPosts(category);
      res.json(posts);
    } catch (err) {
      res.status(500).json({ message: "Posts could not be fetched" });
    }
  });

  // Tekil post getir (Slug ile)
  app.get(api.posts.get.path, async (req, res) => {
    try {
      const post = await storage.getPostBySlug(req.params.slug);
      if (!post) return res.status(404).json({ message: "Post not found" });
      await storage.incrementViewCount(post.id);
      res.json(post);
    } catch (err) {
      res.status(500).json({ message: "Post could not be fetched" });
    }
  });

  // Post oluştur
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

      const postData = { ...input, slug: finalSlug };
      const post = await storage.createPost(postData as any);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof z.ZodError) return res.status(400).json({ message: err.errors[0].message });
      res.status(500).json({ message: "Internal Server Error" });
    }
  });

  // ID ile post getir
  app.get('/api/posts/id/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPostById(id);
      if (!post) return res.status(404).json({ message: "Post not found" });
      res.json(post);
    } catch (err) {
      res.status(500).json({ message: "Error fetching post by ID" });
    }
  });

  // Post güncelle
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

  // Post sil
  app.delete('/api/posts/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const post = await storage.getPostById(id);
      if (post && post.imageUrl) {
        await deleteFromCloudinary(post.imageUrl);
      }
      const success = await storage.deletePost(id);
      if (!success) return res.status(404).json({ message: "Post not found" });
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ message: "Error deleting post" });
    }
  });

  // Resim Yükleme (Gelişmiş Hata Ayıklama Modu)
  app.post('/api/upload', (req, res) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        console.error("❌ CLOUDINARY/MULTER HATASI:", err);
        return res.status(500).json({ 
          message: "Upload failed at provider", 
          error: err.message,
          stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        });
      }

      if (!req.file) {
        console.error("❌ UPLOAD HATASI: Dosya gelmedi.");
        return res.status(400).json({ message: "No file uploaded" });
      }

      try {
        const url = (req.file as any).path;
        console.log("✅ RESİM BAŞARIYLA BULUTA ÇIKTI:", url);
        res.json({ success: 1, file: { url }, url });
      } catch (e) {
        console.error("❌ RESPONSE HATASI:", e);
        res.status(500).json({ message: "Error processing upload response" });
      }
    });
  });

  return httpServer;
}