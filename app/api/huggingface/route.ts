import { NextResponse } from "next/server"
import axios from "axios"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Fallback responses when API key is invalid or request fails
const fallbackResponses = {
  greeting: [
    "Hello! How are you feeling today?",
    "Hi there! I'm ZenBot. How can I support you today?",
    "Welcome! I'm here to listen and help. How are you doing?",
  ],
  feeling_good: [
    "I'm glad to hear you're feeling good! What's been going well for you?",
    "That's wonderful to hear! Celebrating positive moments is important for mental wellbeing.",
    "I'm happy you're doing well! Is there anything specific that's contributed to your good mood?",
  ],
  feeling_bad: [
    "I'm sorry to hear you're not feeling great. Would you like to talk about what's troubling you?",
    "That sounds difficult. Remember that it's okay to have bad days. Is there something specific on your mind?",
    "I'm here for you during the tough times. What's been challenging for you lately?",
  ],
  anxiety: [
    "Anxiety can be really challenging. Have you tried any breathing exercises? Taking slow, deep breaths can help calm your nervous system.",
    "When you're feeling anxious, it might help to ground yourself by naming 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
    "Anxiety is your body's natural response to stress. Remember that these feelings will pass. Is there a specific situation triggering your anxiety?",
  ],
  depression: [
    "Depression can make everything feel more difficult. Remember to be gentle with yourself - even small steps forward matter.",
    "When dealing with depression, it's important to acknowledge your feelings without judgment. Have you been able to talk to anyone else about how you're feeling?",
    "Depression can be isolating, but you're not alone. Many people experience similar feelings. Have you considered speaking with a mental health professional?",
  ],
  stress: [
    "Stress can be overwhelming. Taking short breaks throughout your day might help - even a 5-minute walk or stretching session.",
    "Managing stress often starts with identifying what's within your control and what isn't. Would it help to talk through what's causing your stress?",
    "When we're stressed, self-care becomes even more important. Have you been able to make time for activities that help you recharge?",
  ],
  gratitude: [
    "Practicing gratitude is a powerful tool for mental wellbeing. What are three things you feel grateful for today?",
    "That's a wonderful perspective! Focusing on gratitude can help shift our mindset even during difficult times.",
    "Appreciating the positive aspects of life, even small ones, can be really beneficial for mental health. What else brings you joy?",
  ],
  default: [
    "I'm here to listen and support you. Could you tell me more about how you're feeling?",
    "Thank you for sharing that with me. It takes courage to open up about your feelings.",
    "I understand this might be difficult. Remember that it's okay to take things one step at a time.",
    "Your mental health matters. What small step could you take today to care for yourself?",
    "I'm sorry to hear you're going through this. Would it help to talk more about what's on your mind?",
  ],
}

// Helper function to determine the category based on message content
function determineCategory(message: string): keyof typeof fallbackResponses {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("hey")) {
    return "greeting"
  } else if (
    (lowerMessage.includes("good") ||
      lowerMessage.includes("great") ||
      lowerMessage.includes("happy") ||
      lowerMessage.includes("well")) &&
    (lowerMessage.includes("feel") ||
      lowerMessage.includes("doing") ||
      lowerMessage.includes("am") ||
      lowerMessage.includes("i'm"))
  ) {
    return "feeling_good"
  } else if (
    (lowerMessage.includes("bad") ||
      lowerMessage.includes("sad") ||
      lowerMessage.includes("down") ||
      lowerMessage.includes("not great") ||
      lowerMessage.includes("terrible")) &&
    (lowerMessage.includes("feel") ||
      lowerMessage.includes("doing") ||
      lowerMessage.includes("am") ||
      lowerMessage.includes("i'm"))
  ) {
    return "feeling_bad"
  } else if (lowerMessage.includes("anxi") || lowerMessage.includes("nervous") || lowerMessage.includes("worry")) {
    return "anxiety"
  } else if (
    lowerMessage.includes("depress") ||
    lowerMessage.includes("hopeless") ||
    lowerMessage.includes("meaningless")
  ) {
    return "depression"
  } else if (
    lowerMessage.includes("stress") ||
    lowerMessage.includes("overwhelm") ||
    lowerMessage.includes("too much")
  ) {
    return "stress"
  } else if (
    lowerMessage.includes("grateful") ||
    lowerMessage.includes("thankful") ||
    lowerMessage.includes("appreciate")
  ) {
    return "gratitude"
  }

  return "default"
}

// Helper function to get a random fallback response based on category
function getFallbackResponse(category: keyof typeof fallbackResponses): string {
  const responses = fallbackResponses[category]
  return responses[Math.floor(Math.random() * responses.length)]
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const latestMessage = messages[messages.length - 1]?.content || ""

    // Get API key from environment variables
    const apiKey = process.env.HF_API_TOKEN

    // Check if API key exists
    if (!apiKey) {
      console.error("HF_API_TOKEN environment variable is not set")
      const category = determineCategory(latestMessage)
      const fallbackResponse = getFallbackResponse(category)

      return NextResponse.json(
        {
          response: fallbackResponse,
          source: "fallback",
        },
        { status: 200 },
      )
    }

    // System prompt to guide the model to be empathetic and supportive
    const systemPrompt = `You are ZenBot, an empathetic mental health support chatbot. 
    Your purpose is to provide a safe space for users to discuss their mental health concerns.
    Respond with compassion, empathy, and understanding. 
    Offer supportive advice and coping strategies when appropriate.
    If a user appears to be in crisis, gently suggest professional resources.
    Never diagnose or provide medical advice.
    Keep responses concise (2-3 paragraphs maximum) and conversational.
    Use a warm, supportive tone throughout the conversation.`

    // Format the conversation for the Hugging Face API
    // DialoGPT expects a simple text input, so we'll concatenate the messages
    let conversationText = systemPrompt + "\n\n"

    // Add the last few messages to the conversation context (limit to prevent token overflow)
    const recentMessages = messages.slice(-5)
    recentMessages.forEach((msg: any) => {
      const role = msg.role === "user" ? "User" : "ZenBot"
      conversationText += `${role}: ${msg.content}\n`
    })

    try {
      // Make request to Hugging Face API
      const response = await axios.post(
        "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium",
        { inputs: conversationText },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          timeout: 15000, // 15 second timeout
        },
      )

      // Extract the generated text from the response
      let generatedText = response.data.generated_text || ""

      // Clean up the response if needed
      if (generatedText.startsWith("ZenBot:")) {
        generatedText = generatedText.substring("ZenBot:".length).trim()
      }

      // If the response is empty or too short, use a fallback
      if (!generatedText || generatedText.length < 10) {
        const category = determineCategory(latestMessage)
        generatedText = getFallbackResponse(category)
      }

      return NextResponse.json({
        response: generatedText,
        source: "huggingface",
      })
    } catch (error) {
      console.error("Error making request to Hugging Face API:", error)

      // Get appropriate fallback response based on message content
      const category = determineCategory(latestMessage)
      const fallbackResponse = getFallbackResponse(category)

      return NextResponse.json({
        response: fallbackResponse,
        source: "fallback",
        error: error instanceof Error ? error.message : "Unknown error",
      })
    }
  } catch (error) {
    console.error("Error in Hugging Face API route:", error)

    return NextResponse.json({
      response: "I'm sorry, I encountered an error. Could we try again?",
      source: "fallback",
      error: error instanceof Error ? error.message : "Unknown error",
    })
  }
}
