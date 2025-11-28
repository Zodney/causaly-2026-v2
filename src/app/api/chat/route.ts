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

    // Stream the AI response using OpenAI API
    // You can change the model to:
    // - 'gpt-4o' (recommended - fastest GPT-4 model)
    // - 'gpt-4' (more expensive, very capable)
    // - 'gpt-3.5-turbo' (faster, cheaper, less capable)
    const response = await openai.createChatCompletion({
      model: "gpt-4o",
      stream: true,
      messages,
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
