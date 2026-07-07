import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatGroq } from "@langchain/groq";
import { ChatOpenRouter } from "@langchain/openrouter";
import dotenv from "dotenv";
dotenv.config();

const gemini35 = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash",
  apiKey: process.env.GOOGLE_API_KEY
});

const gemini15 = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-flash",
  apiKey: process.env.GOOGLE_API_KEY
});

// Configure LangChain fallbacks: if gemini-3.5-flash encounters a 503 (high demand) or other API errors,
// it will automatically fall back to the ultra-stable gemini-1.5-flash.
export const gemini = gemini35.withFallbacks([gemini15]);

let groqInstance;
const getGroq = () => {
  if (!process.env.GROQ_API_KEY) {
    console.warn("GROQ_API_KEY is missing. Falling back to Gemini.");
    return gemini;
  }
  if (!groqInstance) {
    const primaryGroq = new ChatGroq({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      maxTokens: undefined,
      maxRetries: 2,
      apiKey: process.env.GROQ_API_KEY
    });
    groqInstance = primaryGroq.withFallbacks([gemini]);
  }
  return groqInstance;
};

let openRouterInstance;
const getOpenRouter = () => {
  if (!process.env.OPENROUTER_API_KEY) {
    console.warn("OPENROUTER_API_KEY is missing. Falling back to Gemini.");
    return gemini;
  }
  if (!openRouterInstance) {
    const primaryOpenRouter = new ChatOpenRouter({
      model: "deepseek/deepseek-chat",
      temperature: 0,
      maxTokens: 2500,
      apiKey: process.env.OPENROUTER_API_KEY
    });
    openRouterInstance = primaryOpenRouter.withFallbacks([gemini]);
  }
  return openRouterInstance;
};

export const getModel = (agent, preferredModel) => {
  if (preferredModel === "gemini") {
    return gemini;
  }
  if (preferredModel === "groq") {
    return getGroq();
  }

  switch (agent) {
    case "coding":
      return gemini;
    case "image":
      return getGroq();
    case "search":
      return getGroq();
    case "chat":
      return getGroq();
    case "vision":
      return gemini;
    default:
      return getGroq();
  }
};