import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Phone, Mail, BookOpen, Heart } from "lucide-react"
import Link from "next/link"

export default function Contact() {
  const crisisResources = [
    {
      name: "National Suicide Prevention Lifeline",
      contact: "988 or 1-800-273-8255",
      description: "24/7, free and confidential support for people in distress",
      website: "https://suicidepreventionlifeline.org/",
    },
    {
      name: "Crisis Text Line",
      contact: "Text HOME to 741741",
      description: "Free 24/7 support via text message",
      website: "https://www.crisistextline.org/",
    },
    {
      name: "SAMHSA's National Helpline",
      contact: "1-800-662-4357",
      description: "Treatment referral and information service (English and Spanish)",
      website: "https://www.samhsa.gov/find-help/national-helpline",
    },
  ]

  const mentalHealthResources = [
    {
      name: "National Alliance on Mental Illness (NAMI)",
      description: "The nation's largest grassroots mental health organization",
      website: "https://www.nami.org/",
    },
    {
      name: "Mental Health America",
      description: "Promoting mental health for all Americans",
      website: "https://www.mhanational.org/",
    },
    {
      name: "Psychology Today Therapist Finder",
      description: "Find a therapist in your area",
      website: "https://www.psychologytoday.com/us/therapists",
    },
  ]

  const selfHelpResources = [
    {
      name: "Headspace",
      description: "Meditation and mindfulness app",
      website: "https://www.headspace.com/",
    },
    {
      name: "Calm",
      description: "App for sleep, meditation and relaxation",
      website: "https://www.calm.com/",
    },
    {
      name: "MoodGYM",
      description: "Free, interactive program to help with depression and anxiety",
      website: "https://moodgym.com.au/",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-teal-600 dark:text-teal-400">Support Resources</h1>

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Crisis Resources */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">Crisis Resources</h2>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-300 font-medium">
              If you or someone you know is in immediate danger, please call emergency services (911 in the US) or go to
              your nearest emergency room.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crisisResources.map((resource, index) => (
              <Card key={index} className="border-teal-100 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-teal-600 dark:text-teal-400">{resource.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium text-lg">{resource.contact}</p>
                  <CardDescription>{resource.description}</CardDescription>
                  <Link href={resource.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="p-0 h-auto text-teal-600 dark:text-teal-400">
                      Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Mental Health Organizations */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">Mental Health Organizations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mentalHealthResources.map((resource, index) => (
              <Card key={index} className="border-teal-100 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-teal-600 dark:text-teal-400">{resource.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardDescription>{resource.description}</CardDescription>
                  <Link href={resource.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="p-0 h-auto text-teal-600 dark:text-teal-400">
                      Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Self-Help Resources */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Heart className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">Self-Help Resources</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selfHelpResources.map((resource, index) => (
              <Card key={index} className="border-teal-100 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-teal-600 dark:text-teal-400">{resource.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardDescription>{resource.description}</CardDescription>
                  <Link href={resource.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="p-0 h-auto text-teal-600 dark:text-teal-400">
                      Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact ZenBot Team */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Mail className="h-5 w-5 text-teal-600 dark:text-teal-400" />
            <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400">Contact Us</h2>
          </div>

          <Card className="border-teal-100 dark:border-slate-700">
            <CardContent className="pt-6">
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Have questions, feedback, or need assistance with ZenBot? Our team is here to help.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white">
                  <Mail className="mr-2 h-4 w-4" /> support@zenbot.example.com
                </Button>
                <Button
                  variant="outline"
                  className="border-teal-600 text-teal-600 hover:bg-teal-50 dark:border-teal-400 dark:text-teal-400 dark:hover:bg-slate-800"
                >
                  <Phone className="mr-2 h-4 w-4" /> 1-800-ZENBOT-HELP
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
