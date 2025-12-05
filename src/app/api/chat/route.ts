/**
 * Chat API Route
 *
 * Handles streaming chat completions using the AI SDK v3.
 * This route receives messages from the client and streams back AI responses.
 *
 * Environment variables required:
 * - OPENAI_API_KEY: Your OpenAI API key
 *
 * Usage:
 * POST /api/chat
 * Body: { messages: Message[] }
 */

import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    // Parse the request body
    const { messages } = await req.json();

    // Validate that messages exist
    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "Messages array is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Check for API key
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({
          error: "OPENAI_API_KEY is not set. Please add it to your .env.local file.",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Add system message for chart formatting
    const systemMessage = {
      role: "system",
      content: `You are a helpful AI assistant. When users ask you to create charts or diagrams:

1. For Mermaid diagrams, wrap them in a code block with the "mermaid" language identifier:
\`\`\`mermaid
flowchart TD
    A[Start] --> B[End]
\`\`\`

2. For Vega-Lite charts, wrap them in a code block with the "vega-lite" language identifier:
\`\`\`vega-lite
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "width": "container",
  "height": 300,
  "mark": "bar",
  "data": {"values": [...]},
  "encoding": {
    "x": {...},
    "y": {...},
    "color": {"value": "var(--chart-1)"}
  }
}
\`\`\`

IMPORTANT RULES FOR VEGA-LITE:
- ALWAYS set "width": "container" for responsive charts
- ALWAYS include color in encoding: "color": {"value": "var(--chart-1)"}
- Use var(--chart-1) through var(--chart-5) for different chart colors
- Include proper axis titles and formatting
- Add tooltips for better interactivity

IMPORTANT RULES FOR ALL CHARTS:
- When asked for a specific chart type, ONLY create that chart type
- Do NOT create explanatory diagrams showing how to create the chart
- Always use proper markdown code fences with the language identifier
- Place the chart code block directly in your response without extra explanation diagrams`,
    };

    // Prepend system message to user messages
    const messagesWithSystem = [systemMessage, ...messages];

    // Stream the AI response using OpenAI API
    // You can change the model to:
    // - 'gpt-4o' (recommended - fastest GPT-4 model)
    // - 'gpt-4' (more expensive, very capable)
    // - 'gpt-3.5-turbo' (faster, cheaper, less capable)
    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      stream: true,
      messages: messagesWithSystem,
      // Optional: Add temperature for creativity (0-2)
      // temperature: 0.7,
      // Optional: Add max tokens limit
      // max_tokens: 1000,
    });

    // Convert the response to a stream and return it
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({
        error: "An error occurred while processing your request",
        details: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
