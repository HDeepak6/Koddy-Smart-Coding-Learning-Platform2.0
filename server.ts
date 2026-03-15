import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cors from "cors";
import OpenAI from "openai";

const db = new Database("koddy.db");
const JWT_SECRET = "koddy-secret-key-2026";

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS enrollments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    course_id TEXT NOT NULL,
    enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
  );
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // --- Health API ---
  app.get("/api/health", (req, res) => {
    try {
      const userCount = db.prepare("SELECT COUNT(*) as count FROM users").get() as any;
      res.json({ status: "ok", users: userCount.count });
    } catch (err: any) {
      console.error("Health check failed:", err.message);
      res.status(500).json({ status: "error", message: err.message });
    }
  });

  // --- Auth API ---
  app.post("/api/auth/signup", (req, res) => {
    console.log("Signup request received:", req.body.email);
    const { name, email, password } = req.body;
    try {
      const hashedPassword = bcrypt.hashSync(password, 10);
      const info = db.prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)").run(name, email, hashedPassword);
      const token = jwt.sign({ id: info.lastInsertRowid, name, email }, JWT_SECRET);
      console.log("Signup successful for:", email);
      res.json({ token, user: { id: info.lastInsertRowid, name, email } });
    } catch (err: any) {
      console.error("Signup error:", err.message);
      res.status(400).json({ error: err.message.includes("UNIQUE") ? "Email already exists" : "Signup failed" });
    }
  });

  app.post("/api/auth/login", (req, res) => {
    console.log("Login request received:", req.body.email);
    const { email, password } = req.body;
    try {
      const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET);
        console.log("Login successful for:", email);
        res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
      } else {
        console.log("Login failed: Invalid credentials for", email);
        res.status(401).json({ error: "Invalid credentials" });
      }
    } catch (err: any) {
      console.error("Login error:", err.message);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  // --- Courses API ---
  app.get("/api/enrollments/:userId", (req, res) => {
    const enrollments = db.prepare("SELECT course_id FROM enrollments WHERE user_id = ?").all(req.params.userId);
    res.json(enrollments.map((e: any) => e.course_id));
  });

  app.post("/api/enroll", (req, res) => {
    const { userId, courseId } = req.body;
    try {
      db.prepare("INSERT INTO enrollments (user_id, course_id) VALUES (?, ?)").run(userId, courseId);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ error: "Enrollment failed" });
    }
  });

  // --- AI API ---
  app.post("/api/ai/chat", async (req, res) => {
    const { prompt, history } = req.body;
    const apiKey = process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "NVIDIA_API_KEY is not configured on the server." });
    }

    try {
      const openai = new OpenAI({
        apiKey: apiKey,
        baseURL: 'https://integrate.api.nvidia.com/v1',
      });

      // Convert Gemini-style history to OpenAI-style messages
      const messages = (history || []).map((h: any) => ({
        role: h.role === 'model' ? 'assistant' : 'user',
        content: h.parts[0].text
      }));

      // Add system instruction
      messages.unshift({
        role: "system",
        content: "You are Koddy, a smart coding assistant. You help students with coding explanations, debugging, and programming concepts. Be encouraging, professional, and concise. Use markdown for code blocks."
      });

      // Add current prompt
      messages.push({
        role: "user",
        content: prompt
      });

      const completion = await openai.chat.completions.create({
        model: "meta/llama-3.1-405b-instruct",
        messages: messages,
        temperature: 0.2,
        top_p: 0.7,
        max_tokens: 1024,
      });

      res.json({ message: completion.choices[0]?.message?.content || "I couldn't generate a response." });
    } catch (error: any) {
      console.error("NVIDIA AI Server Error:", error);
      res.status(error.status || 500).json({ error: error.message || "AI request failed" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
