# ZenBot - Mental Health Chatbot

ZenBot is an AI-powered mental health chatbot that provides empathetic support and resources for mental wellness.

## Setup

1. Clone the repository
2. Install dependencies:
   \`\`\`
   npm install
   \`\`\`
3. Create a `.env.local` file in the root directory with your Google Gemini API key:
   \`\`\`
   GEMINI_API_KEY=your_gemini_api_key_here
   \`\`\`
   
   > **Important**: You need to obtain a valid API key from the [Google AI Studio](https://makersuite.google.com/app/apikey). The default placeholder value will not work.

4. Run the development server:
   \`\`\`
   npm run dev
   \`\`\`

## Features

- Chat with an AI-powered mental health assistant
- Get support for anxiety, stress, and other mental health concerns
- Access breathing exercises and self-care tips
- Find crisis resources when needed

## Technology

- Next.js for the frontend and API routes
- Google Gemini API for natural language processing
- Tailwind CSS for styling
- Framer Motion for animations

## Fallback Mode

If a valid Gemini API key is not provided, ZenBot will operate in "Fallback Mode" with pre-defined responses. While functional, this mode lacks the advanced AI capabilities of the full version.

## Security

The Google Gemini API key is stored securely in the `.env.local` file and is only used on the server side. It is never exposed to the client.
