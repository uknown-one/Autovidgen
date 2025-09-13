import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema } from "@shared/schema";
import { z } from "zod";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Script generation prompts for different categories
const scriptPrompts = {
  conspiracy: {
    systemPrompt: "You are an expert conspiracy theory researcher and YouTube content creator. Create compelling, well-researched conspiracy theory scripts that are engaging but responsible. Focus on historical mysteries, unexplained phenomena, and thought-provoking questions rather than harmful misinformation.",
    categories: {
      "Government Cover-Ups": "Focus on declassified documents, historical government secrecy, and well-documented cases of official cover-ups.",
      "Ancient Mysteries": "Explore unexplained historical artifacts, lost civilizations, and archaeological mysteries.",
      "Secret Societies": "Investigate historical secret societies, their documented influence, and mysterious rituals based on available evidence."
    }
  },
  horror: {
    systemPrompt: "You are a master horror storyteller and YouTube content creator. Create atmospheric, spine-chilling scripts that build tension and fear through psychological elements, mysterious circumstances, and unsettling scenarios.",
    categories: {
      "True Horror Stories": "Craft stories based on real paranormal encounters, unexplained phenomena, and documented strange events.",
      "Creepypasta": "Create original fictional horror stories with modern urban settings, internet-age fears, and psychological horror elements.",
      "Urban Legends": "Explore local legends, folklore, and mysterious tales passed down through communities, examining their possible origins."
    }
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Project management routes
  app.get("/api/projects", async (req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/projects/:id", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ error: "Failed to fetch project" });
    }
  });

  app.post("/api/projects", async (req, res) => {
    try {
      const validatedData = insertProjectSchema.parse(req.body);
      const project = await storage.createProject(validatedData);
      res.status(201).json(project);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: "Invalid project data", details: error.errors });
      }
      console.error("Error creating project:", error);
      res.status(500).json({ error: "Failed to create project" });
    }
  });

  app.put("/api/projects/:id", async (req, res) => {
    try {
      const updates = req.body;
      const project = await storage.updateProject(req.params.id, updates);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ error: "Failed to update project" });
    }
  });

  app.delete("/api/projects/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteProject(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Project not found" });
      }
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ error: "Failed to delete project" });
    }
  });

  // AI Script Generation
  app.post("/api/projects/:id/generate-script", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      const category = project.category.toLowerCase();
      const isConspiracy = ["conspiracy", "paranormal", "mystery"].includes(category);
      const promptType = isConspiracy ? "conspiracy" : "horror";
      
      // Determine target length in words
      const lengthMap = {
        "short": "300-500 words (1-3 minutes)",
        "medium": "800-1200 words (5-10 minutes)", 
        "long": "1500-2500 words (10-20 minutes)",
        "extended": "2500-4000 words (20-30 minutes)"
      };
      const targetWords = lengthMap[project.targetLength as keyof typeof lengthMap] || lengthMap.medium;

      // Create detailed prompt
      const systemPrompt = scriptPrompts[promptType].systemPrompt;
      
      const userPrompt = `Create a ${promptType} script for a YouTube video with the following specifications:

Title: ${project.title}
Description: ${project.description || "No specific description provided"}
Category: ${project.category}
Target Length: ${targetWords}
Tone: ${project.tone}

Requirements:
- Create an engaging hook in the first 30 seconds
- Structure with clear sections using [Scene X: Title] markers
- Include natural speaking patterns and pauses
- End with a call-to-action for subscribers and comments
- Make it ${project.tone} in tone throughout
- Ensure content is engaging and YouTube-friendly

The script should be ready for voiceover recording with proper pacing and dramatic timing.`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.8,
        max_tokens: 3000,
      });

      const generatedScript = completion.choices[0]?.message?.content;
      
      if (!generatedScript) {
        throw new Error("Failed to generate script content");
      }

      // Update project with generated script
      const updatedProject = await storage.updateProject(project.id, {
        script: generatedScript,
        status: "script-ready"
      });

      res.json({
        script: generatedScript,
        project: updatedProject
      });

    } catch (error) {
      console.error("Error generating script:", error);
      res.status(500).json({ 
        error: "Failed to generate script", 
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Text-to-Speech Generation
  app.post("/api/projects/:id/generate-voiceover", async (req, res) => {
    try {
      const project = await storage.getProject(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      if (!project.script) {
        return res.status(400).json({ error: "Project must have a script before generating voiceover" });
      }

      const { voice = "onyx" } = req.body;
      
      // Generate audio using OpenAI TTS
      const mp3 = await openai.audio.speech.create({
        model: "tts-1",
        voice: voice as "alloy" | "echo" | "fable" | "onyx" | "nova" | "shimmer",
        input: project.script,
      });

      // Convert to buffer
      const buffer = Buffer.from(await mp3.arrayBuffer());
      
      // In a real app, you'd save this to cloud storage and return the URL
      // For now, we'll create a data URL (not recommended for large files in production)
      const audioBase64 = buffer.toString('base64');
      const audioUrl = `data:audio/mpeg;base64,${audioBase64}`;

      // Update project with audio URL
      const updatedProject = await storage.updateProject(project.id, {
        audioUrl: audioUrl,
        status: "voiceover-done"
      });

      res.json({
        audioUrl: audioUrl,
        project: updatedProject
      });

    } catch (error) {
      console.error("Error generating voiceover:", error);
      res.status(500).json({ 
        error: "Failed to generate voiceover", 
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
