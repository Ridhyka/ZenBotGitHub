"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "ai/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Send, Wind, Phone, Sparkles, Smile, Frown, Meh, ThumbsUp, Heart } from "lucide-react"
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
import { cn } from "@/lib/utils"

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [showMoodPrompt, setShowMoodPrompt] = useState(false)
  const [lastActivity, setLastActivity] = useState(Date.now())
  const [showTypingBubble, setShowTypingBubble] = useState(false)
  const [typingText, setTypingText] = useState("")
  const [showConfetti, setShowConfetti] = useState(false)

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

  // Update last activity timestamp
  const updateActivity = () => {
    setLastActivity(Date.now())
    setShowMoodPrompt(false)
  }

  // Typing animation effect
  useEffect(() => {
    if (isLoading) {
      setShowTypingBubble(true)
      const phrases = ["Thinking...", "Processing your thoughts...", "Crafting a response...", "Reflecting on that..."]
      let currentPhraseIndex = 0
      let currentCharIndex = 0
      let currentPhrase = phrases[currentPhraseIndex]

      const typingInterval = setInterval(() => {
        if (currentCharIndex < currentPhrase.length) {
          setTypingText(currentPhrase.substring(0, currentCharIndex + 1))
          currentCharIndex++
        } else {
          // Move to next phrase after a pause
          setTimeout(() => {
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length
            currentPhrase = phrases[currentPhraseIndex]
            currentCharIndex = 0
            setTypingText("")
          }, 1000)
        }
      }, 100)

      return () => {
        clearInterval(typingInterval)
        setShowTypingBubble(false)
        setTypingText("")
      }
    }
  }, [isLoading])

  const handleMoodSelection = (mood: string) => {
    const moodMessages = {
      great: "I'm feeling really good today!",
      good: "I'm doing pretty well today.",
      neutral: "I'm feeling okay, nothing special.",
      bad: "I'm not feeling great today.",
    }

    if (moodMessages[mood as keyof typeof moodMessages]) {
      const form = new FormData()
      form.append("message", moodMessages[mood as keyof typeof moodMessages])
      handleSubmit({ preventDefault: () => {} } as any)
    }

    setShowMoodPrompt(false)
    updateActivity()

    // Show confetti for positive moods
    if (mood === "great" || mood === "good") {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 3000)
    }
  }

  const quickActions = [
    {
      id: "breathing",
      icon: Wind,
      label: "🧘 Breathing Exercise",
      color: "from-cyan-500 to-blue-500",
      content: (
        <>
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 text-transparent bg-clip-text">
              Breathing Exercise
            </DialogTitle>
            <DialogDescription>A simple breathing technique to help you relax and center yourself.</DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-40 h-40 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 dark:from-cyan-500/30 dark:to-blue-500/30 flex items-center justify-center animate-breathe">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 text-lg font-medium">
                    Breathe
                  </span>
                </div>
                <div className="absolute inset-0 rounded-full border-4 border-cyan-400 dark:border-cyan-600 animate-breathe-pulse opacity-75"></div>
                <div className="absolute inset-0 rounded-full border-4 border-blue-400 dark:border-blue-600 animate-breathe-pulse animation-delay-1000 opacity-75"></div>
              </div>
              <motion.p
                className="text-center text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Inhale deeply through your nose for 4 counts.
                <br />
                Hold your breath for 2 counts.
                <br />
                Exhale slowly through your mouth for 6 counts.
                <br />
                Repeat this cycle 5 times.
              </motion.p>
            </div>
          </div>
        </>
      ),
    },
    {
      id: "selfcare",
      icon: Heart,
      label: "💖 Self-Care Tip",
      color: "from-fuchsia-500 to-pink-500",
      content: (
        <>
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400 text-transparent bg-clip-text">
              Self-Care Tips
            </DialogTitle>
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                >
                  <div className="rounded-full bg-gradient-to-r from-fuchsia-500 to-pink-500 p-2 text-white font-medium shadow-glow-fuchsia">
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
      color: "from-amber-500 to-orange-500",
      content: (
        <>
          <DialogHeader>
            <DialogTitle className="bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 text-transparent bg-clip-text">
              Crisis Support Resources
            </DialogTitle>
            <DialogDescription>
              If you're in crisis or need immediate support, please reach out to these resources.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-6">
            <div className="space-y-3">
              <h3 className="font-medium bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 text-transparent bg-clip-text">
                United States
              </h3>
              <motion.div
                className="space-y-2 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 p-4 rounded-lg border border-amber-200 dark:border-amber-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <p className="font-medium">National Suicide Prevention Lifeline</p>
                <p className="text-lg font-bold">988 or 1-800-273-8255</p>
                <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50 animate-pulse">
                  Available 24/7
                </Badge>
              </motion.div>
              <motion.div
                className="space-y-2 bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/30 dark:to-pink-900/30 p-4 rounded-lg border border-fuchsia-200 dark:border-fuchsia-800"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <p className="font-medium">Crisis Text Line</p>
                <p className="text-lg font-bold">Text HOME to 741741</p>
                <Badge variant="outline" className="bg-white/50 dark:bg-slate-800/50 animate-pulse">
                  Available 24/7
                </Badge>
              </motion.div>
            </div>

            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="font-medium bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 text-transparent bg-clip-text">
                International
              </h3>
              <p>For international crisis resources, please visit:</p>
              <a
                href="https://findahelpline.com/i/iasp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-600 dark:text-amber-400 underline block bg-amber-50 dark:bg-amber-900/30 p-3 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors border border-amber-200 dark:border-amber-800"
              >
                International Association for Suicide Prevention
              </a>
            </motion.div>

            <motion.div
              className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r-lg"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                If you or someone else is in immediate danger, please call your local emergency services (such as 911 in
                the US).
              </p>
            </motion.div>
          </div>
        </>
      ),
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Confetti effect */}
      {showConfetti && <div className="confetti-container fixed inset-0 pointer-events-none z-50"></div>}

      <Card className="border-0 shadow-2xl bg-gradient-to-b from-white to-violet-50 dark:from-slate-900 dark:to-violet-950/30 overflow-hidden rounded-2xl">
        <CardHeader className="bg-gradient-to-r from-violet-500 to-fuchsia-500 dark:from-violet-600 dark:to-fuchsia-600 border-b-0 p-6">
          <CardTitle className="text-white flex items-center text-xl">
            <Sparkles className="h-5 w-5 mr-2 animate-sparkle" />
            Chat with ZenBot
            <Badge className="ml-auto bg-white/20 hover:bg-white/30 text-white animate-pulse">AI Powered</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0 relative">
          {/* Background patterns */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>

          <div className="h-[60vh] overflow-y-auto p-4 space-y-4" onClick={updateActivity} onKeyDown={updateActivity}>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 p-5 shadow-glow-violet"
                >
                  <Avatar className="h-20 w-20 border-4 border-white dark:border-slate-800">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" alt="ZenBot" />
                    <AvatarFallback className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-2xl">
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
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-amber-400 text-transparent bg-clip-text animate-gradient">
                    Welcome to ZenBot
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    I'm here to listen and provide support for your mental health journey. How are you feeling today?
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 pt-4">
                    <Button
                      variant="outline"
                      className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 hover:scale-105 transition-transform"
                      onClick={() => handleMoodSelection("great")}
                    >
                      <Smile className="h-5 w-5 mr-2 text-green-500 animate-bounce-slow" /> Great
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 hover:scale-105 transition-transform"
                      onClick={() => handleMoodSelection("good")}
                    >
                      <ThumbsUp className="h-5 w-5 mr-2 text-blue-500 animate-bounce-slow animation-delay-200" /> Good
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 hover:scale-105 transition-transform"
                      onClick={() => handleMoodSelection("neutral")}
                    >
                      <Meh className="h-5 w-5 mr-2 text-yellow-500 animate-bounce-slow animation-delay-400" /> Okay
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 hover:scale-105 transition-transform"
                      onClick={() => handleMoodSelection("bad")}
                    >
                      <Frown className="h-5 w-5 mr-2 text-red-500 animate-bounce-slow animation-delay-600" /> Not Great
                    </Button>
                  </div>
                </motion.div>
              </div>
            ) : (
              messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl p-4 shadow-lg",
                      message.role === "user"
                        ? "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-glow-violet"
                        : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 shadow-md",
                    )}
                  >
                    {message.role === "assistant" && (
                      <div className="flex items-center mb-2">
                        <Avatar className="h-8 w-8 mr-2 border-2 border-fuchsia-200 dark:border-fuchsia-800 animate-pulse-slow">
                          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="ZenBot" />
                          <AvatarFallback className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs">
                            ZB
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 text-transparent bg-clip-text">
                          ZenBot
                        </span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </motion.div>
              ))
            )}
            {showTypingBubble && (
              <motion.div
                className="flex justify-start"
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
              >
                <div className="max-w-[80%] rounded-2xl p-4 bg-white dark:bg-slate-800 shadow-md">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2 border-2 border-fuchsia-200 dark:border-fuchsia-800">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="ZenBot" />
                      <AvatarFallback className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white text-xs">
                        ZB
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-300">{typingText}</span>
                      <div className="flex space-x-1 ml-1">
                        <div className="w-2 h-2 rounded-full bg-violet-600 dark:bg-violet-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-fuchsia-600 dark:bg-fuchsia-400 animate-bounce animation-delay-200"></div>
                        <div className="w-2 h-2 rounded-full bg-pink-600 dark:bg-pink-400 animate-bounce animation-delay-400"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {showMoodPrompt && messages.length > 0 && (
              <motion.div
                className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border-l-4 border-fuchsia-500 dark:border-fuchsia-400"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
              >
                <p className="text-gray-700 dark:text-gray-300 mb-3">How are you feeling now?</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800 hover:scale-105 transition-transform"
                    onClick={() => handleMoodSelection("great")}
                  >
                    <Smile className="h-4 w-4 mr-1 text-green-500 animate-bounce-slow" /> Better
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 border-yellow-200 dark:border-yellow-800 hover:scale-105 transition-transform"
                    onClick={() => handleMoodSelection("neutral")}
                  >
                    <Meh className="h-4 w-4 mr-1 text-yellow-500 animate-bounce-slow animation-delay-200" /> The Same
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-red-200 dark:border-red-800 hover:scale-105 transition-transform"
                    onClick={() => handleMoodSelection("bad")}
                  >
                    <Frown className="h-4 w-4 mr-1 text-red-500 animate-bounce-slow animation-delay-400" /> Still
                    Struggling
                  </Button>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </CardContent>
        <CardFooter className="border-t border-violet-100 dark:border-slate-700 p-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
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
                      className={cn(
                        "bg-gradient-to-r border-0 text-white hover:opacity-90 shadow-md hover:shadow-lg transition-all animate-pulse-slow",
                        action.color,
                      )}
                      style={{ animationDelay: `${Math.random() * 2}s` }}
                    >
                      <action.icon className="h-4 w-4 mr-1" />
                      {action.label}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-violet-200 dark:border-violet-800">
                    {action.content}
                  </DialogContent>
                </Dialog>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                handleSubmit(e)
                updateActivity()
              }}
              className="flex items-center space-x-2"
            >
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type your message..."
                className="flex-1 border-violet-200 focus-visible:ring-fuchsia-400 dark:border-slate-700 rounded-full py-6 pl-6 pr-4 shadow-md"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-full w-12 h-12 p-0 bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white shadow-glow-violet hover:shadow-glow-fuchsia transition-all animate-shimmer"
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
