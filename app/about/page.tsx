import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Heart, Shield, MessageCircle } from "lucide-react"

export default function About() {
  const values = [
    {
      title: "Empathy First",
      description:
        "We believe in the power of empathetic listening and understanding. Every interaction with ZenBot is designed to make you feel heard and validated.",
      icon: Heart,
    },
    {
      title: "Safe Space",
      description:
        "Your privacy and emotional safety are our priorities. ZenBot provides a judgment-free zone where you can express yourself openly.",
      icon: Shield,
    },
    {
      title: "Accessible Support",
      description:
        "Mental health support should be available to everyone. ZenBot aims to break down barriers to accessing emotional support.",
      icon: MessageCircle,
    },
    {
      title: "Evidence-Based Approach",
      description:
        "Our responses are informed by evidence-based practices in psychology and mental health, while maintaining a conversational and supportive tone.",
      icon: Brain,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-teal-600 dark:text-teal-400">About ZenBot</h1>

        <div className="prose dark:prose-invert max-w-none mb-8">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            ZenBot was created with a simple mission: to provide accessible, empathetic mental health support in moments
            when you need someone to talk to.
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            In today's fast-paced world, many people struggle with stress, anxiety, and other mental health challenges,
            yet face barriers to accessing support. ZenBot bridges this gap by offering a safe, anonymous space to
            express your thoughts and feelings, receive supportive responses, and learn coping strategies for everyday
            mental wellness.
          </p>

          <p className="text-gray-700 dark:text-gray-300">
            While ZenBot is not a replacement for professional mental health care, it can be a helpful companion on your
            wellness journey, providing in-the-moment support and guiding you toward professional resources when needed.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-teal-600 dark:text-teal-400">Our Values</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {values.map((value, index) => (
            <Card key={index} className="border-teal-100 dark:border-slate-700">
              <CardHeader className="pb-2">
                <div className="rounded-full bg-teal-100 p-2 w-fit dark:bg-teal-900 mb-2">
                  <value.icon className="h-5 w-5 text-teal-600 dark:text-teal-400" />
                </div>
                <CardTitle className="text-teal-600 dark:text-teal-400">{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-700 dark:text-gray-300">{value.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-teal-50 dark:bg-slate-800 rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-teal-600 dark:text-teal-400">Important Note</h2>
          <p className="text-gray-700 dark:text-gray-300">
            ZenBot is designed to provide supportive conversation and general mental wellness information. It is not a
            crisis service, diagnostic tool, or substitute for professional mental health treatment.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            If you're experiencing a mental health emergency or crisis, please contact a crisis helpline or emergency
            services immediately. You can find crisis resources in the "Crisis Helpline" section of our chat interface.
          </p>
        </div>
      </div>
    </div>
  )
}
