import { NextResponse } from "next/server"
import GeminiClient from "@/lib/gemini-client" // Adjust the import path as needed

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Fallback responses when API key is invalid or request fails
const fallbackResponses = [
  "I'm here to listen and support you. Could you tell me more about how you're feeling?",
  "Thank you for sharing that with me. It takes courage to open up about your feelings.",
  "I understand this might be difficult. Remember that it's okay to take things one step at a time.",
  "Your mental health matters. What small step could you take today to care for yourself?",
  "I'm sorry to hear you're going through this. Would it help to talk more about what's on your mind?",
]

// Updated list of models to try based on the actual available models
const modelsToTry = [
  "gemini-1.5-flash",
  "gemini-1.5-flash-001",
  "gemini-1.5-flash-002",
  "gemini-1.5-flash-8b-001",
  "gemini-1.5-pro-002",
  "gemini-1.5-pro-001",
  "text-bison-001"
];

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const latestMessage = messages[messages.length - 1]?.content || ""

    // Get API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY

    // Check if API key exists
    if (!apiKey) {
      console.error("GEMINI_API_KEY environment variable is not set")
      return NextResponse.json({
        response: "Configuration error: API key not found in environment variables",
        source: "error",
      }, { status: 500 })
    }

    // System prompt to guide Gemini to be empathetic and supportive
    const systemPrompt = `You are ZenBot, an empathetic mental health support chatbot. 
    Your purpose is to provide a safe space for users to discuss their mental health concerns.
    Respond with compassion, empathy, and understanding. 
    Offer supportive advice and coping strategies when appropriate.
    If a user appears to be in crisis, gently suggest professional resources.
    Never diagnose or provide medical advice.
    Keep responses concise (2-3 paragraphs maximum) and conversational.
    Use a warm, supportive tone throughout the conversation.`

    // Format messages for Gemini API
    const formattedMessages = [
      { role: "user", parts: [{ text: systemPrompt }] },
      ...messages.map(msg => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }]
      }))
    ]

    try {
      // Start with the default model
      const geminiClient = new GeminiClient(apiKey, "gemini-1.5-flash");
      
      // List available models first
      let availableModels = [];
      try {
        const modelResponse = await geminiClient.listModels();
        availableModels = modelResponse.models || [];
      } catch (listError) {
        console.error("Error listing models:", listError);
        // Continue with the default models to try
      }
      
      // Attempt to call the available Gemini model
      let response = null;
      let lastError = null;
      
      // First try models that we know exist
      for (const model of modelsToTry) {
        try {
          // Update the model name
          geminiClient.modelName = model;
          
          // Try to generate content with this model
          console.log(`Attempting to use model: ${model}`);
          response = await geminiClient.generateContent(formattedMessages);
          
          // If we reach here, the model worked
          console.log(`Successfully used model: ${model}`);
          break;
        } catch (modelError) {
          lastError = modelError;
          console.error(`Failed with model ${model}:`, modelError);
          
          // If it's not a quota error, continue to the next model
          if (!(modelError instanceof Error && modelError.message.includes("quota"))) {
            continue;
          }
          
          // If it's a quota error, wait briefly and try the next model
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      }
      
      // If we have a successful response
      if (response) {
        const responseText =
          response.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I'm sorry, I couldn't generate a response. Please try again."

        return NextResponse.json({
          response: responseText,
          source: "gemini",
        });
      }
      
      // If all models failed, throw the last error
      if (lastError) {
        throw lastError;
      }
      
      throw new Error("All models failed without specific errors");
      
    } catch (error) {
      console.error("Error making request to Gemini API:", error)
      
      // Return a fallback response instead of an error
      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

      return NextResponse.json({
        response: fallbackResponse,
        source: "fallback",
        error: error instanceof Error ? error.message : "Unknown error"
      })
    }
  } catch (error) {
    console.error("Error in Gemini API route:", error)

    // Return a fallback response instead of an error
    const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

    return NextResponse.json({
        response: fallbackResponse,
        source: "fallback",
        error: error instanceof Error ? error.message : "Unknown error"
    })
  }
}