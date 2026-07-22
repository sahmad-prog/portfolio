import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini API client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Configure it in the AI Studio Secrets panel.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Interactive QA Test Case & Playbook Generator Endpoint
app.post("/api/generate-test-plan", async (req, res) => {
  try {
    const { url, description } = req.body;
    if (!url && !description) {
      res.status(400).json({ error: "Please provide either a Target URL or a system feature description." });
      return;
    }

    const ai = getAiClient();
    const prompt = `
      You are an elite, highly rigorous Senior Manual QA Engineer.
      The user wants to test the following app/feature:
      Target URL: ${url || "Not specified"}
      Feature/App Description: ${description || "General web/mobile portal"}

      Please generate a comprehensive, professional Manual and API Test Plan.
      Include a short overview of the testing scope, exactly 4-5 highly detailed test cases (covering Functional, Edge cases, Security vulnerabilities, and responsive UI layout), and a suggested REST API payload with proper method, endpoint, and JSON body to verify via Postman.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        systemInstruction: "You are an expert QA Automator and Manual QA Lead. Provide extremely precise, technical, and actionable manual testing checklists and API validations.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            overview: {
              type: Type.STRING,
              description: "High-level summary of the target testing strategy and environment setup.",
            },
            testCases: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "E.g., QA-101, SEC-202, UI-303" },
                  title: { type: Type.STRING, description: "Clear, descriptive title of what is verified." },
                  category: { type: Type.STRING, description: "Testing type (e.g., Functional, Security, UI Alignment, Edge Case)" },
                  preconditions: { type: Type.STRING, description: "Prerequisites needed before starting." },
                  steps: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Step-by-step reproduction instructions.",
                  },
                  expectedResult: { type: Type.STRING, description: "Expected correct behavior." },
                  severity: { type: Type.STRING, description: "Severity tier: Critical, High, Medium, Low" },
                },
                required: ["id", "title", "category", "preconditions", "steps", "expectedResult", "severity"],
              },
            },
            apiPayloadSuggestion: {
              type: Type.OBJECT,
              properties: {
                method: { type: Type.STRING, description: "HTTP verb, e.g., POST, GET, PUT" },
                endpoint: { type: Type.STRING, description: "Path to audit, e.g., /api/v1/auth/login" },
                requestBodyJson: { type: Type.STRING, description: "Valid, stringified mock JSON sample body" },
              },
              required: ["method", "endpoint", "requestBodyJson"],
            },
          },
          required: ["overview", "testCases", "apiPayloadSuggestion"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI Model.");
    }

    res.json(JSON.parse(text));
  } catch (error: any) {
    console.error("Gemini Test Plan Generation Error:", error);
    res.status(500).json({
      error: "Failed to generate dynamic test plan.",
      details: error.message || String(error),
    });
  }
});

// Serve assets and boot
async function startServer() {
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
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
