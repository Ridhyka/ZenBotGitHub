import { NextResponse } from "next/server"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Fallback responses when API key is invalid
const fallbackResponses = [
  "I'm here to listen and support you. Could you tell me more about how you're feeling?",
  "Thank you for sharing that with me. It takes courage to open up about your feelings.",
  "I understand this might be difficult. Remember that it's okay to take things one step at a time.",
  "Your mental health matters. What small step could you take today to care for yourself?",
  "I'm sorry to hear you're going through this. Would it help to talk more about what's on your mind?",
]

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()
    const latestMessage = messages[messages.length - 1]?.content || ""

    // Get API key from environment variables
    const apiKey = process.env.GEMINI_API_KEY

    // Check if API key exists and has a valid format
    if (!apiKey || apiKey === "your_gemini_api_key_here" || apiKey.trim() === "") {
      console.log("API key is not configured or is invalid - using fallback response")

      // Return a fallback response instead of an error
      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

      return NextResponse.json({
        response: fallbackResponse,
        source: "fallback",
      })
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

    // Format the request for Gemini
    // Using the generateContent endpoint for the gemini-pro model
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`

    // Format the request for Gemini
    const requestBody = {
      contents: [
        {
          parts: [{ text: systemPrompt }],
        },
        {
          parts: [{ text: latestMessage }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
      safetySettings: [
        {
          category: "HARM_CATEGORY_HARASSMENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_HATE_SPEECH",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
        {
          category: "HARM_CATEGORY_DANGEROUS_CONTENT",
          threshold: "BLOCK_MEDIUM_AND_ABOVE",
        },
      ],
    }

    try {
      // Make the request to Gemini API
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        console.log("Gemini API returned an error - using fallback response")
        // Return a fallback response instead of an error
        const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

        return NextResponse.json({
          response: fallbackResponse,
          source: "fallback",
        })
      }

      const data = await response.json()

      // Extract the response text from Gemini
      const responseText =
        data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm sorry, I couldn't generate a response. Please try again."

      return NextResponse.json({
        response: responseText,
        source: "gemini",
      })
    } catch (error) {
      console.log("Error making request to Gemini API:", error)
      // Return a fallback response instead of an error
      const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

      return NextResponse.json({
        response: fallbackResponse,
        source: "fallback",
      })
    }
  } catch (error) {
    console.log("Error in Gemini API route:", error)

    // Return a fallback response instead of an error
    const fallbackResponse = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]

    return NextResponse.json({
      response: fallbackResponse,
      source: "fallback",
    })
  }
}
