var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json());
var aiClient = null;
function getAiClient() {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is missing. Configure it in the AI Studio Secrets panel.");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
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
          type: import_genai.Type.OBJECT,
          properties: {
            overview: {
              type: import_genai.Type.STRING,
              description: "High-level summary of the target testing strategy and environment setup."
            },
            testCases: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  id: { type: import_genai.Type.STRING, description: "E.g., QA-101, SEC-202, UI-303" },
                  title: { type: import_genai.Type.STRING, description: "Clear, descriptive title of what is verified." },
                  category: { type: import_genai.Type.STRING, description: "Testing type (e.g., Functional, Security, UI Alignment, Edge Case)" },
                  preconditions: { type: import_genai.Type.STRING, description: "Prerequisites needed before starting." },
                  steps: {
                    type: import_genai.Type.ARRAY,
                    items: { type: import_genai.Type.STRING },
                    description: "Step-by-step reproduction instructions."
                  },
                  expectedResult: { type: import_genai.Type.STRING, description: "Expected correct behavior." },
                  severity: { type: import_genai.Type.STRING, description: "Severity tier: Critical, High, Medium, Low" }
                },
                required: ["id", "title", "category", "preconditions", "steps", "expectedResult", "severity"]
              }
            },
            apiPayloadSuggestion: {
              type: import_genai.Type.OBJECT,
              properties: {
                method: { type: import_genai.Type.STRING, description: "HTTP verb, e.g., POST, GET, PUT" },
                endpoint: { type: import_genai.Type.STRING, description: "Path to audit, e.g., /api/v1/auth/login" },
                requestBodyJson: { type: import_genai.Type.STRING, description: "Valid, stringified mock JSON sample body" }
              },
              required: ["method", "endpoint", "requestBodyJson"]
            }
          },
          required: ["overview", "testCases", "apiPayloadSuggestion"]
        }
      }
    });
    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI Model.");
    }
    res.json(JSON.parse(text));
  } catch (error) {
    console.error("Gemini Test Plan Generation Error:", error);
    res.status(500).json({
      error: "Failed to generate dynamic test plan.",
      details: error.message || String(error)
    });
  }
});
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
