import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  // System message to guide the AI to be empathetic and supportive
  const systemMessage = {
    role: "system",
    content: `You are ZenBot, an empathetic mental health support chatbot. 
    Your purpose is to provide a safe space for users to discuss their mental health concerns.
    Respond with compassion, empathy, and understanding. 
    Offer supportive advice and coping strategies when appropriate.
    If a user appears to be in crisis, gently suggest professional resources.
    Never diagnose or provide medical advice.
    Keep responses concise (2-3 paragraphs maximum) and conversational.
    Use a warm, supportive tone throughout the conversation.`,
  }

  // Add system message to the beginning of the conversation
  const conversationWithSystem = [systemMessage, ...messages]

  const result = streamText({
    model: openai("gpt-4o"),
    messages: conversationWithSystem,
  })

  return result.toDataStreamResponse()
}
