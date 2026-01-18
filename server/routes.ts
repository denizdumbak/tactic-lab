
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
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  }
});

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.posts.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const posts = await storage.getPosts(category);
    res.json(posts);
  });

  app.get(api.posts.get.path, async (req, res) => {
    const post = await storage.getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  app.post(api.posts.create.path, async (req, res) => {
    try {
      const input = api.posts.create.input.parse(req.body);
      const post = await storage.createPost(input);
      res.status(201).json(post);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.get('/api/posts/id/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    const post = await storage.getPostById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json(post);
  });

  app.put('/api/posts/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid post ID" });
      }
      const input = api.posts.update.input.parse(req.body);
      const post = await storage.updatePost(id, input);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      res.json(post);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete('/api/posts/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid post ID" });
    }
    const success = await storage.deletePost(id);
    if (!success) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.json({ success: true });
  });

  app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    const url = `/uploads/${req.file.filename}`;
    res.json({ success: true, url });
  });

  app.use('/uploads', (await import('express')).default.static(uploadDir));

  // ... routes above

  // Seed the database asynchronously (don't await to not block startup)
  seedDatabase().catch(console.error);

  return httpServer;
}

// Seed function to be called from index.ts or executed manually
export async function seedDatabase() {
  const existingPosts = await storage.getPosts();
  if (existingPosts.length === 0) {
    console.log("Seeding database...");
    
    // 1. A Tactical Analysis Post
    await storage.createPost({
      slug: "modern-pressing-traps",
      title: "The Evolution of Pressing Traps in Modern Football",
      summary: "How mid-block triggers are replacing high-press chaos.",
      content: `
        <p>The era of the heavy metal high press is evolving. Managers are no longer instructing players to chase every ball in the attacking third. Instead, we are seeing a shift towards sophisticated mid-block pressing traps.</p>
        
        <h2>The Mid-Block Trigger</h2>
        <p>Teams like Arsenal and Bayer Leverkusen have mastered the art of inviting pressure to create artificial transition moments. By allowing the opponent to progress to the halfway line, they open up space behind the defensive line that wouldn't exist against a deep block.</p>
        
        <p>The key is patience. The trap is not sprung until the ball enters a specific zone—usually a pass to a full-back who has their back to goal.</p>
        
        <blockquote>"Control without the ball is just as important as control with it."</blockquote>
        
        <h2>Numerical Superiority</h2>
        <p>Once the trigger is activated, the objective is immediate numerical superiority around the ball carrier. This isn't just about winning the ball back; it's about winning it back in a position where the opponent is expanded and vulnerable.</p>
      `,
      category: "taktik",
      imageUrl: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&q=80"
    });

    // 2. A Match Analysis Post
    await storage.createPost({
      slug: "derby-tactical-breakdown",
      title: "Tactical Breakdown: The Weekend Derby",
      summary: "Analyzing the key battles that decided the match.",
      content: `
        <p>Sunday's derby wasn't decided by individual brilliance, but by a structural mismatch in midfield. The home side's 4-2-3-1 completely overloaded the visitors' lone pivot.</p>
        
        <h2>The Box Midfield</h2>
        <p>By inverting both full-backs, the hosts created a box midfield that gave them a permanent 4v3 advantage in the center of the park. This forced the opposition wingers to tuck inside, leaving the wide channels completely exposed.</p>
        
        <p>It was a checkmate position within 15 minutes.</p>
      `,
      category: "mac-analizi",
      imageUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&q=80"
    });

    // 3. A Scout Report Post (with Profile)
    await storage.createPost({
      slug: "scouting-report-luca-rossi",
      title: "Scouting Report: The Next Regista?",
      summary: "Deep dive into the 19-year-old controlling midfielder turning heads in Serie B.",
      content: `
        <p>It is rare to find a teenager with the composure to dictate tempo in professional football. Luca Rossi is an exception.</p>
        
        <p>Playing for a mid-table Serie B side, Rossi has registered the highest pass completion rate in the league under pressure. His ability to scan the field before receiving the ball is reminiscent of a young Verratti.</p>
        
        <h2>Technical Analysis</h2>
        <p>Rossi's first touch is always directional, taking him away from the immediate pressure. He rarely needs a second touch to set himself up.</p>
      `,
      category: "scout",
      imageUrl: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&q=80",
      scoutProfile: {
        playerName: "Luca Rossi",
        age: 19,
        position: "CDM / CM",
        role: "Deep-lying Playmaker",
        strengths: ["Vision", "Press Resistance", "Long Passing", "Tempo Control"],
        risks: ["Aerial Duels", "Recovery Pace"]
      }
    });

    console.log("Database seeded successfully.");
  }
}
