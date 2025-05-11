"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Loader2,
  Send,
  Wind,
  BookOpen,
  Phone,
  Sparkles,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  AlertTriangle,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { motion } from "@/components/motion-wrapper"
import { AchievementUnlocked } from "./achievement-unlocked"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [showMoodPrompt, setShowMoodPrompt] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())
  const [showAchievement, setShowAchievement] = useState(false)
  const [usingHuggingFace, setUsingHuggingFace] = useState(true)
  const [showHFTokenAlert, setShowHFTokenAlert] = useState(false)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Show mood prompt after 30 seconds of inactivity
  useEffect(() => {
    const inactivityTimer = setTimeout(() => {
      if (messages.length > 0 && !showMoodPrompt) {
        setShowMoodPrompt(true)
      }
    }, 30000)

    return () => clearTimeout(inactivityTimer)
  }, [lastActivity, messages.length, showMoodPrompt])

  // Show achievement after first message
  useEffect(() => {
    if (messages.length === 2 && messages[0].role === "user" && messages[1].role === "assistant") {
      setShowAchievement(true)
    }
  }, [messages])

  // Update last activity timestamp
  const updateActivity = () => {
    setLastActivity(Date.now())
    setShowMoodPrompt(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // First try the Gemini API
      const response = await fetch("/api/huggingface", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      })

      const data = await response.json()

      // If we get a fallback response from Hugging Face API, show the alert
      if (data.source === "fallback" && !usingHuggingFace) {
        setUsingHuggingFace(false)
        setShowHFTokenAlert(true)

        // Hide the alert after 5 seconds
        setTimeout(() => {
          setShowHFTokenAlert(false)
        }, 5000)
      }

      // Add assistant message to chat
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)

      // Use mock API as final fallback
      try {
        const response = await fetch("/api/mock-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
          }),
        })

        const data = await response.json()

        // Add assistant message to chat
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: data.response,
        }
        setMessages((prev) => [...prev, assistantMessage])

        if (!usingHuggingFace) {
          setUsingHuggingFace(false)
          setShowHFTokenAlert(true)

          // Hide the alert after 5 seconds
          setTimeout(() => {
            setShowHFTokenAlert(false)
          }, 5000)
        }
      } catch (fallbackError) {
        // If even the mock API fails, show a generic message
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm sorry, I encountered an error processing your message. Please try again later.",
        }
        setMessages((prev) => [...prev, errorMessage])
      }
    } finally {
      setIsLoading(false)
      updateActivity()
    }
  }

  const handleMoodSelection = (mood: string) => {
    const moodMessages = {
      great: "I'm feeling really good today!",
      good: "I'm doing pretty well today.",
      neutral: "I'm feeling okay, nothing special.",
      bad: "I'm not feeling great today.",
    }

    if (moodMessages[mood as keyof typeof moodMessages]) {
      setInput(moodMessages[mood as keyof typeof moodMessages])
      handleSubmit({ preventDefault: () => {} } as React.FormEvent)
    }

    setShowMoodPrompt(false)
    updateActivity()
  }

  const quickActions = [
    {
      id: "breathing",
      icon: Wind,
      label: "🧘 Breathing Exercise",
      content: (
        <>
          <DialogHeader>
            <DialogTitle>Breathing Exercise</DialogTitle>
            <DialogDescription>A simple breathing technique to help you relax and center yourself.</DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-r from-teal-400 to-blue-400 flex items-center justify-center animate-pulse-slow">
                  <span className="text-white text-lg font-medium">Breathe</span>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-white animate-ping-slow opacity-75"></div>
              </div>
              <p className="text-center text-gray-600 dark:text-gray-300">
                Inhale deeply through your nose for 4 counts.
                <br />
                Hold your breath for 2 counts.
                <br />
                Exhale slowly through your mouth for 6 counts.
                <br />
                Repeat this cycle 5 times.
              </p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "selfcare",
      icon: BookOpen,
      label: "📖 Self-Care Tip",
      content: (
        <>
          <DialogHeader>
            <DialogTitle>Self-Care Tips</DialogTitle>
            <DialogDescription>Simple practices to incorporate into your daily routine.</DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <ul className="space-y-3">
              {[
                "Take short breaks throughout your day to stretch and reset your mind.",
                "Stay hydrated - drink water regularly throughout the day.",
                "Practice gratitude by noting three things you're thankful for each day.",
                "Limit screen time, especially before bed, to improve sleep quality.",
                "Connect with a friend or family member - social connections boost wellbeing.",
              ].map((tip, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="rounded-full bg-gradient-to-r from-teal-400 to-blue-400 p-2 text-white font-medium">
                    {index + 1}
                  </div>
                  <span className="mt-1">{tip}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </>
      ),
    },
    {
      id: "crisis",
      icon: Phone,
      label: "📞 Crisis Helpline",
      content: (
        <>
          <DialogHeader>
            <DialogTitle>Crisis Support Resources</DialogTitle>
            <DialogDescription>
              If you're in crisis or need immediate support, please reach out to these resources.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <h3 className="font-medium text-teal-600 dark:text-teal-400">United States</h3>
              <div className="space-y-2 bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/30 dark:to-blue-900/30 p-4 rounded-lg">
                <p className="font-medium">National Suicide Prevention Lifeline</p>
                <p className="text-lg font-bold">988 or 1-800-273-8255</p>
                <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                  Available 24/7
                </Badge>
              </div>
              <div className="space-y-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-lg">
                <p className="font-medium">Crisis Text Line</p>
                <p className="text-lg font-bold">Text HOME to 741741</p>
                <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50">
                  Available 24/7
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-medium text-teal-600 dark:text-teal-400">International</h3>
              <p>For international crisis resources, please visit:</p>
              <a
                href="https://findahelpline.com/i/iasp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 dark:text-teal-400 underline block bg-teal-50 dark:bg-teal-900/30 p-3 rounded-lg hover:bg-teal-100 dark:hover:bg-teal-900/50 transition-colors"
              >
                International Association for Suicide Prevention
              </a>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                If you or someone else is in immediate danger, please call your local emergency services (such as 911 in
                the US).
              </p>
            </div>
          </div>
        </>
      ),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <AchievementUnlocked
        title="First Conversation"
        description="You've started your wellness journey!"
        show={showAchievement}
        onClose={() => setShowAchievement(false)}
      />

      {showHFTokenAlert && (
        <Alert
          variant="default"
          className="mb-4 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
        >
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertTitle className="text-amber-600 dark:text-amber-400">API Key Not Configured</AlertTitle>
          <AlertDescription>
            ZenBot is running in basic mode. To use the Hugging Face API, please add a valid API token to your
            environment variables.
          </AlertDescription>
        </Alert>
      )}

      <Card className="border-0 shadow-2xl bg-gradient-to-b from-white to-teal-50 dark:from-slate-900 dark:to-slate-800 overflow-hidden neon-glow">
        <CardHeader className="bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 dark:from-teal-600 dark:via-blue-600 dark:to-purple-600 border-b-0">
          <CardTitle className="text-white flex items-center">
            <Sparkles className="h-5 w-5 mr-2 animate-pulse" />
            Chat with ZenBot {!usingHuggingFace ? "(Basic Mode)" : "(Powered by Hugging Face)"}
            <Badge className="ml-auto bg-white/20 hover:bg-white/30 text-white">
              {!usingHuggingFace ? "Basic Mode" : "AI Powered"}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 relative">
          <div className="h-[60vh] overflow-y-auto p-4 space-y-4" onClick={updateActivity} onKeyDown={updateActivity}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-full bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-5"
                >
                  <Avatar className="h-20 w-20 border-4 border-white dark:border-slate-800">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="ZenBot" />
                    <AvatarFallback className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-2xl">
                      ZB
                    </AvatarFallback>
                  </Avatar>
                </motion.div>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="space-y-4 max-w-md"
                >
                  <h3 className="text-2xl font-bold rainbow-text">Welcome to ZenBot</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    I'm here to listen and provide support for your mental health journey. How are you feeling today?
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 pt-4">
                    <Button
                      variant="outline"
                      className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 hover-3d"
                      onClick={() => handleMoodSelection("great")}
                    >
                      <Smile className="h-5 w-5 mr-2 text-green-500" /> Great
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover-3d"
                      onClick={() => handleMoodSelection("good")}
                    >
                      <ThumbsUp className="h-5 w-5 mr-2 text-blue-500" /> Good
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover-3d"
                      onClick={() => handleMoodSelection("neutral")}
                    >
                      <Meh className="h-5 w-5 mr-2 text-yellow-500" /> Okay
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 hover-3d"
                      onClick={() => handleMoodSelection("bad")}
                    >
                      <Frown className="h-5 w-5 mr-2 text-red-500" /> Not Great
                    </Button>
                  </div>
                </motion.div>
              </div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 shadow-md ${
                      message.role === "user"
                        ? "bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 text-white shine"
                        : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200"
                    }`}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center mb-2">
                        <Avatar className="h-8 w-8 mr-2 border-2 border-teal-200 dark:border-teal-800">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="ZenBot" />
                          <AvatarFallback className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs">
                            ZB
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium rainbow-text">ZenBot</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </motion.div>
              ))
            )}
            {isLoading && (
              <motion.div className="flex justify-start" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <div className="max-w-[80%] rounded-2xl p-4 bg-white dark:bg-slate-800 shadow-md">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2 border-2 border-teal-200 dark:border-teal-800">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="ZenBot" />
                      <AvatarFallback className="bg-gradient-to-r from-teal-500 to-blue-500 text-white text-xs">
                        ZB
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400 animate-bounce"></div>
                      <div className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce animation-delay-200"></div>
                      <div className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400 animate-bounce animation-delay-400"></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {showMoodPrompt && messages.length > 0 && (
              <motion.div
                className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border-l-4 border-teal-500 dark:border-teal-400"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <p className="text-gray-700 dark:text-gray-300 mb-3">How are you feeling now?</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 border-green-200 dark:border-green-800 hover-3d"
                    onClick={() => handleMoodSelection("great")}
                  >
                    <Smile className="h-4 w-4 mr-1 text-green-500" /> Better
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800 hover-3d"
                    onClick={() => handleMoodSelection("neutral")}
                  >
                    <Meh className="h-4 w-4 mr-1 text-yellow-500" /> The Same
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800 hover-3d"
                    onClick={() => handleMoodSelection("bad")}
                  >
                    <Frown className="h-4 w-4 mr-1 text-red-500" /> Still Struggling
                  </Button>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t border-teal-100 dark:border-slate-700 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
          <div className="w-full space-y-4">
            <div className="flex flex-wrap gap-2 justify-center">
              {quickActions.map((action) => (
                <Dialog
                  key={action.id}
                  open={openDialog === action.id}
                  onOpenChange={(open) => {
                    setOpenDialog(open ? action.id : null)
                    updateActivity()
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-gradient-to-r from-teal-50 to-blue-50 dark:from-teal-900/30 dark:to-blue-900/30 border-teal-200 dark:border-teal-800 text-teal-600 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/50 shadow-md hover:shadow-lg transition-all hover-3d"
                    >
                      <action.icon className="h-4 w-4 mr-1" />
                      {action.label}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">{action.content}</DialogContent>
                </Dialog>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 border-teal-200 focus-visible:ring-teal-400 dark:border-slate-700 rounded-full py-6 pl-6 pr-4 shadow-md"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-full w-12 h-12 p-0 bg-gradient-to-r from-teal-500 via-blue-500 to-purple-500 hover:from-teal-600 hover:via-blue-600 hover:to-purple-600 text-white shadow-md hover:shadow-lg transition-all ripple-effect"
              >
                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                <span className="sr-only">Send message</span>
              </Button>
            </form>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}