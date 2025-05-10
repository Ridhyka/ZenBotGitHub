import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Heart, Shield, MessageCircle, Sparkles, Star, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const testimonials = [
    {
      quote:
        "ZenBot helped me through my anxiety like no other app. It feels like talking to a friend who really gets it.",
      author: "Jamie, 28",
      rating: 5,
    },
    {
      quote:
        "I was skeptical at first, but the daily check-ins have become an essential part of my mental health routine.",
      author: "Alex, 34",
      rating: 5,
    },
    {
      quote: "The breathing exercises alone are worth it. They've helped me through several panic attacks.",
      author: "Sam, 22",
      rating: 4,
    },
  ]

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section with animated background */}
      <section className="w-full py-16 md:py-24 lg:py-32 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/30 via-fuchsia-500/20 to-amber-500/30 dark:from-violet-900/40 dark:via-fuchsia-900/30 dark:to-amber-900/40 animate-gradient-x"></div>

        {/* Animated blobs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 dark:bg-pink-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-500/20 dark:bg-yellow-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-500/20 dark:bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>

        {/* Animated particles */}
        <div className="particles-container absolute inset-0 z-0"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="flex flex-col items-center space-y-8 text-center">
            <Badge className="px-4 py-2 text-sm bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full animate-pulse shadow-lg shadow-violet-500/20">
              <Sparkles className="h-4 w-4 mr-1 inline animate-sparkle" /> New AI-Powered Mental Health Support
            </Badge>

            <div className="space-y-4 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-amber-400 text-transparent bg-clip-text animate-gradient">
                Feel Better with ZenBot
              </h1>
              <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl lg:text-2xl dark:text-gray-400">
                Your personal AI companion for{" "}
                <span className="font-semibold text-violet-600 dark:text-violet-400 animate-pulse-text">
                  stress relief
                </span>
                ,
                <span className="font-semibold text-fuchsia-600 dark:text-fuchsia-400 animate-pulse-text animation-delay-200">
                  {" "}
                  anxiety management
                </span>
                , and
                <span className="font-semibold text-amber-600 dark:text-amber-400 animate-pulse-text animation-delay-400">
                  {" "}
                  emotional support
                </span>{" "}
                — available 24/7.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md">
              <Link href="/chat" className="w-full sm:w-auto">
                <Button className="w-full text-lg group bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white border-0 h-12 shadow-glow-violet animate-shimmer">
                  Start Chatting Now
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/dashboard" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full text-lg border-2 border-fuchsia-400 text-fuchsia-600 hover:bg-fuchsia-50 dark:border-fuchsia-400 dark:text-fuchsia-400 dark:hover:bg-fuchsia-900/20 h-12 animate-border-pulse"
                >
                  Explore Features
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2 mt-6 text-gray-500 dark:text-gray-400">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 flex items-center justify-center text-white text-xs font-bold border-2 border-white dark:border-gray-800 animate-bounce-staggered"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {i}
                  </div>
                ))}
              </div>
              <span className="text-sm">
                Join <span className="font-bold text-fuchsia-600 dark:text-fuchsia-400">10,000+</span> users feeling
                better today
              </span>
            </div>
          </div>
        </div>

        {/* Floating chat bubbles */}
        <div className="hidden md:block absolute top-40 left-10 animate-float-slow">
          <div className="bg-white dark:bg-slate-800 p-3 rounded-lg shadow-glow-violet">
            <p className="text-sm">How are you feeling today?</p>
          </div>
        </div>
        <div className="hidden md:block absolute top-60 right-20 animate-float-slow animation-delay-1000">
          <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 p-3 rounded-lg shadow-glow-fuchsia">
            <p className="text-sm text-white">I'm here to listen and help.</p>
          </div>
        </div>

        {/* Animated shapes */}
        <div className="absolute bottom-10 left-1/4 w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-20 dark:opacity-40 animate-ping-slow"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full opacity-20 dark:opacity-40 animate-ping-slow animation-delay-1000"></div>
      </section>

      {/* Features Section with animated cards */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-white to-violet-50 dark:from-slate-950 dark:to-violet-950/30 relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="absolute inset-0 bg-gradient-radial from-violet-500/10 to-transparent"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-amber-400 text-transparent bg-clip-text mb-4 animate-gradient">
              Why People{" "}
              <span className="underline decoration-wavy decoration-fuchsia-400 dark:decoration-fuchsia-600 animate-wave">
                Love
              </span>{" "}
              ZenBot
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Experience the future of mental wellness with these powerful features
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 md:gap-12">
            <div className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 animate-fade-in-up">
              <div className="absolute -top-5 -left-5 rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 p-4 shadow-glow-violet animate-pulse-slow">
                <MessageCircle className="h-6 w-6 text-white" />
              </div>
              <div className="pt-6 space-y-4">
                <h3 className="text-xl font-bold text-violet-600 dark:text-violet-400 group-hover:text-fuchsia-500 dark:group-hover:text-fuchsia-300 transition-colors">
                  24/7 AI Companion
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Chat anytime with our empathetic AI that understands your emotions and provides personalized support.
                </p>
                <div className="flex items-center text-fuchsia-600 dark:text-fuchsia-400 font-medium">
                  <Zap className="h-4 w-4 mr-1 animate-pulse" /> Powered by advanced GPT technology
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-r from-violet-400/10 to-fuchsia-400/10 rounded-full blur-xl group-hover:opacity-100 opacity-0 transition-opacity"></div>
            </div>

            <div className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 animate-fade-in-up animation-delay-200">
              <div className="absolute -top-5 -left-5 rounded-full bg-gradient-to-r from-fuchsia-400 to-pink-400 p-4 shadow-glow-fuchsia animate-pulse-slow">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div className="pt-6 space-y-4">
                <h3 className="text-xl font-bold text-fuchsia-600 dark:text-fuchsia-400 group-hover:text-pink-500 dark:group-hover:text-pink-300 transition-colors">
                  Mood Tracking
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Track your emotional journey with interactive tools that help you understand your patterns and
                  progress.
                </p>
                <div className="flex items-center text-pink-600 dark:text-pink-400 font-medium">
                  <Zap className="h-4 w-4 mr-1 animate-pulse" /> Visualize your emotional wellbeing
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-r from-fuchsia-400/10 to-pink-400/10 rounded-full blur-xl group-hover:opacity-100 opacity-0 transition-opacity"></div>
            </div>

            <div className="group relative bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:rotate-1 animate-fade-in-up animation-delay-400">
              <div className="absolute -top-5 -left-5 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 p-4 shadow-glow-amber animate-pulse-slow">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="pt-6 space-y-4">
                <h3 className="text-xl font-bold text-amber-600 dark:text-amber-400 group-hover:text-orange-500 dark:group-hover:text-orange-300 transition-colors">
                  Crisis Support
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Access immediate coping tools and professional resources when you need them most.
                </p>
                <div className="flex items-center text-orange-600 dark:text-orange-400 font-medium">
                  <Zap className="h-4 w-4 mr-1 animate-pulse" /> Instant access to proven techniques
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-r from-amber-400/10 to-orange-400/10 rounded-full blur-xl group-hover:opacity-100 opacity-0 transition-opacity"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="w-full py-12 md:py-24 bg-gradient-to-b from-violet-50 to-white dark:from-violet-950/30 dark:to-slate-950 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-confetti-pattern opacity-5"></div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="text-center mb-12">
            <Badge className="mb-4 px-4 py-2 text-sm bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white rounded-full shadow-glow-fuchsia">
              Success Stories
            </Badge>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-amber-400 text-transparent bg-clip-text animate-gradient">
              Hear from Our Community
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="overflow-hidden group hover:shadow-2xl transition-all duration-500 border-0 bg-gradient-to-br from-white to-violet-50 dark:from-slate-800 dark:to-violet-950/30 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardContent className="p-6 relative">
                  <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-gradient-to-r from-violet-400 to-fuchsia-400 p-2 rounded-full shadow-glow-violet transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                    <Star className="h-5 w-5 text-white animate-spin-slow" />
                  </div>
                  <div className="mb-4">
                    <div className="flex">
                      {Array(testimonial.rating)
                        .fill(0)
                        .map((_, i) => (
                          <Star
                            key={i}
                            className="h-5 w-5 text-amber-400 fill-amber-400 animate-pulse-staggered"
                            style={{ animationDelay: `${i * 0.2}s` }}
                          />
                        ))}
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 italic mb-4">"{testimonial.quote}"</p>
                  <p className="font-semibold text-fuchsia-600 dark:text-fuchsia-400">{testimonial.author}</p>

                  {/* Decorative elements */}
                  <div className="absolute bottom-2 right-2 opacity-10 text-6xl font-serif">"</div>
                  <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-r from-violet-400/5 to-fuchsia-400/5 rounded-full blur-2xl group-hover:opacity-100 opacity-0 transition-opacity"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with animated background */}
      <section className="w-full py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-amber-500/20 dark:from-violet-900/30 dark:via-fuchsia-900/20 dark:to-amber-900/30 animate-gradient-x"></div>

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-violet-400/30 dark:bg-violet-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-fuchsia-400/30 dark:bg-fuchsia-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-400/30 dark:bg-amber-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="container px-4 md:px-6 relative z-10">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto border border-white/20 dark:border-slate-700/20">
            <div className="flex flex-col items-center space-y-6 text-center">
              <div className="inline-block rounded-full bg-gradient-to-r from-violet-400 to-fuchsia-400 p-3 shadow-glow-violet animate-bounce-slow">
                <Sparkles className="h-6 w-6 text-white animate-sparkle" />
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-amber-400 text-transparent bg-clip-text animate-gradient">
                  Start Your Wellness Journey Today
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Join thousands who've transformed their mental wellbeing with just a few minutes a day.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Link href="/chat" className="w-full">
                  <Button className="w-full text-lg group bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white border-0 h-12 shadow-glow-violet hover:shadow-glow-fuchsia transition-all animate-shimmer">
                    Get Started Free
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>

              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <Shield className="h-4 w-4" />
                <span className="text-sm">No credit card required • Cancel anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
