import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink, Phone, Mail, BookOpen, Heart, Github, Coffee, AlertCircle } from "lucide-react"
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
      <div className="max-w-4xl mx-auto mb-8 bg-violet-50 dark:bg-violet-900/20 border border-violet-100 dark:border-violet-800/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-violet-600 dark:text-violet-400 mt-0.5" />
          <div>
            <h2 className="font-medium text-violet-800 dark:text-violet-300 mb-1">Student Project Disclaimer</h2>
            <p className="text-sm text-violet-700 dark:text-violet-300">
              ZenBot is an open-source project created by a student for educational purposes. This is not a commercial mental health service. 
              Please use the professional resources listed below for actual support.
            </p>
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-amber-400 text-transparent bg-clip-text">Support Resources</h1>

      <div className="space-y-8 max-w-4xl mx-auto">
        {/* Crisis Resources */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Phone className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400">Crisis Resources</h2>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-lg p-4 mb-6">
            <p className="text-red-700 dark:text-red-300 font-medium">
              If you or someone you know is in immediate danger, please call emergency services (911 in the US) or go to
              your nearest emergency room.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crisisResources.map((resource, index) => (
              <Card key={index} className="border-violet-100 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-violet-600 dark:text-violet-400">{resource.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="font-medium text-lg">{resource.contact}</p>
                  <CardDescription>{resource.description}</CardDescription>
                  <Link href={resource.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="p-0 h-auto text-violet-600 dark:text-violet-400">
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
            <BookOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400">Mental Health Organizations</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mentalHealthResources.map((resource, index) => (
              <Card key={index} className="border-violet-100 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-violet-600 dark:text-violet-400">{resource.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardDescription>{resource.description}</CardDescription>
                  <Link href={resource.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="p-0 h-auto text-violet-600 dark:text-violet-400">
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
            <Heart className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            <h2 className="text-2xl font-bold text-violet-600 dark:text-violet-400">Self-Help Resources</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {selfHelpResources.map((resource, index) => (
              <Card key={index} className="border-violet-100 dark:border-slate-700">
                <CardHeader className="pb-2">
                  <CardTitle className="text-violet-600 dark:text-violet-400">{resource.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <CardDescription>{resource.description}</CardDescription>
                  <Link href={resource.website} target="_blank" rel="noopener noreferrer">
                    <Button variant="link" className="p-0 h-auto text-violet-600 dark:text-violet-400">
                      Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* About Project / Contact */}
        <section className="mt-12">
          <Card className="border-violet-100 dark:border-slate-700 overflow-hidden">
            <div className="bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-amber-500/10 dark:from-violet-900/20 dark:via-fuchsia-900/20 dark:to-amber-900/20 p-6">
              <h2 className="text-2xl font-bold text-center bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-amber-400 text-transparent bg-clip-text mb-2">
                About This Project
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
                ZenBot is an open-source project exploring the intersection of AI and mental wellness.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    <h3 className="font-medium text-lg text-violet-600 dark:text-violet-400">Contribute</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    This is an educational open-source project. Feel free to explore the code, submit issues or contribute on GitHub.
                  </p>
                  <Link href="https://github.com/Ridhyka/ZenBotGitHub" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-violet-600 hover:bg-violet-700 text-white">
                      <Github className="mr-2 h-4 w-4" /> View on GitHub
                    </Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    <h3 className="font-medium text-lg text-violet-600 dark:text-violet-400">Contact Student Developer</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Have questions about this project? I'd love to hear your feedback or answer any questions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button variant="outline" className="border-violet-600 text-violet-600 hover:bg-violet-50 dark:border-violet-400 dark:text-violet-400 dark:hover:bg-slate-800">
                      <Mail className="mr-2 h-4 w-4" /> ridhikashekhawat77@gmail.com
                    </Button>
                    {/* <Link href="https://buymeacoffee.com/yourname" target="_blank" rel="noopener noreferrer">
                      <Button variant="ghost" className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-slate-800">
                        <Coffee className="mr-2 h-4 w-4" /> Buy me a coffee
                      </Button>
                    </Link> */}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}