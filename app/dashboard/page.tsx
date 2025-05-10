// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { ArrowRight, Brain, Calendar, Clock, Heart, Sparkles, TrendingUp, Award, Zap } from "lucide-react"
// import Link from "next/link"
// import { Badge } from "@/components/ui/badge"

// export default function Dashboard() {
//   // Sample data - in a real app, this would come from a database
//   const userStats = {
//     chatDuration: 20, // minutes
//     moodScore: 7,
//     sessionsThisWeek: 3,
//     daysStreak: 5,
//   }

//   const mentalHealthTips = [
//     {
//       title: "Practice Mindful Breathing",
//       description: "Take 5 minutes to focus on your breath. Inhale for 4 counts, hold for 2, exhale for 6.",
//       icon: Brain,
//       color: "from-cyan-400 to-blue-400",
//       bgColor: "from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20",
//       borderColor: "border-cyan-200 dark:border-cyan-800",
//     },
//     {
//       title: "Connect with Nature",
//       description: "Spend at least 20 minutes outdoors today. Nature has a calming effect on our nervous system.",
//       icon: Heart,
//       color: "from-fuchsia-400 to-pink-400",
//       bgColor: "from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20",
//       borderColor: "border-fuchsia-200 dark:border-fuchsia-800",
//     },
//   ]

//   const achievements = [
//     {
//       name: "First Chat",
//       description: "Completed your first conversation with ZenBot",
//       progress: 100,
//       icon: Award,
//       color: "from-amber-400 to-orange-400",
//       bgColor: "from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20",
//     },
//     {
//       name: "Consistent Check-ins",
//       description: "Chat with ZenBot 5 days in a row",
//       progress: userStats.daysStreak * 20,
//       icon: Calendar,
//       color: "from-violet-400 to-fuchsia-400",
//       bgColor: "from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20",
//     },
//     {
//       name: "Mood Tracker",
//       description: "Track your mood for 7 consecutive days",
//       progress: 60,
//       icon: TrendingUp,
//       color: "from-emerald-400 to-green-400",
//       bgColor: "from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20",
//     },
//   ]

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <div>
//           <Badge className="mb-2 px-3 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full shadow-glow-violet animate-pulse">
//             <Sparkles className="h-3 w-3 mr-1 inline animate-sparkle" /> Your Wellness Hub
//           </Badge>
//           <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-amber-400 text-transparent bg-clip-text animate-gradient">
//             Your Wellness Dashboard
//           </h1>
//         </div>
//         <Link href="/chat">
//           <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white border-0 shadow-glow-violet hover:shadow-glow-fuchsia transition-all animate-shimmer">
//             Start a New Chat <ArrowRight className="ml-2 h-4 w-4" />
//           </Button>
//         </Link>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
//         {/* User Journey Overview */}
//         <Card className="md:col-span-7 border-0 shadow-2xl bg-gradient-to-br from-white to-violet-50 dark:from-slate-900 dark:to-violet-950/30 overflow-hidden rounded-xl hover:shadow-glow-violet transition-all duration-300">
//           <CardHeader className="pb-2 border-b border-violet-100 dark:border-slate-700 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 dark:from-violet-500/5 dark:to-fuchsia-500/5">
//             <CardTitle className="bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 text-transparent bg-clip-text flex items-center">
//               <TrendingUp className="h-5 w-5 mr-2 text-violet-500 dark:text-violet-400" /> Your Journey
//             </CardTitle>
//             <CardDescription>Track your progress and wellness metrics</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6 pt-6">
//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-sm font-medium flex items-center">
//                   <Clock className="h-4 w-4 text-cyan-600 dark:text-cyan-400 mr-1 animate-spin-slow" /> Today's Chat Duration
//                 </span>
//                 <span className="text-sm font-bold text-cyan-600 dark:text-cyan-400">
//                   {userStats.chatDuration} minutes
//                 </span>
//               </div>
//               <div className="relative h-2 overflow-hidden bg-cyan-100 dark:bg-slate-700 rounded-full">
//                 <div 
//                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-blue-400 animate-progress-pulse"
//                   style={{ width: `${userStats.chatDuration * 5}%` }}
//                 ></div>
//               </div>
//             </div>

//             <div className="space-y-2">
//               <div className="flex justify-between">
//                 <span className="text-sm font-medium flex items-center">
//                   <Heart className="h-4 w-4 text-pink-600 dark:text-pink-400 mr-1 animate-beat" /> Weekly Mood Score
//                 </span>
//                 <span className="text-sm font-bold text-pink-600 dark:text-pink-400">{userStats.moodScore}/10</span>
//               </div>
//               <div className="relative h-2 overflow-hidden bg-pink-100 dark:bg-slate-700 rounded-full">
//                 <div 
//                   className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 to-fuchsia-400 animate-progress-pulse"
//                   style={{ width: `${userStats.moodScore * 10}%` }}
//                 ></div>
//               </div>
//             </div>

//             <div className="grid grid-cols-2 gap-4 pt-2">
//               <div className="flex flex-col items-center p-4 bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 rounded-xl shadow-lg border border-cyan-200 dark:border-cyan-800 hover:shadow-glow-cyan transition-all duration-300 hover:scale-105">
//                 <div className="rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 p-2 mb-2 shadow-glow-cyan animate-pulse-slow">
//                   <Calendar className="h-5 w-5 text-white" />
//                 </div>
//                 <span className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 text-transparent bg-clip-text animate-count">
//                   {userStats.sessionsThisWeek}
//                 </span>
//                 <span className="text-xs text-gray-500 dark:text-gray-400">Sessions this week</span>
//               </div>
//               <div className="flex flex-col items-center p-4 bg-gradient-to-br from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/30 dark:to-pink-900/30 rounded-xl shadow-lg border border-fuchsia-200 dark:border-fuchsia-800 hover:shadow-glow-fuchsia transition-all duration-300 hover:scale-105">
//                 <div className="rounded-full bg-gradient-to-r from-fuchsia-400 to-pink-400 p-2 mb-2 shadow-glow-fuchsia animate-pulse-slow">
//                   <Zap className="h-5 w-5 text-white animate-pulse" />
//                 </div>
//                 <span className="text-3xl font-bold bg-gradient-to-r from-fuchsia-600 to-pink-600 dark:from-fuchsia-400 dark:to-pink-400 text-transparent bg-clip-text animate-count">
//                   {userStats.daysStreak}
//                 </span>
//                 <span className="text-xs text-gray-500 dark:text-gray-400">Day streak</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Achievements */}
//         <Card className="md:col-span-5 border-0 shadow-2xl bg-gradient-to-br from-white to-amber-50 dark:from-slate-900 dark:to-amber-950/30 overflow-hidden rounded-xl hover:shadow-glow-amber transition-all duration-300">
//           <CardHeader className="pb-2 border-b border-amber-100 dark:border-slate-700 bg-gradient-to-r from-amber-500/10 to-orange-500/10 dark:from-amber-500/5 dark:to-orange-500/5">
//             <CardTitle className="bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 text-transparent bg-clip-text flex items-center">
//               <Award className="h-5 w-5 mr-2 text-amber-500 dark:text-amber-400 animate-bounce-slow" /> Achievements
//             </CardTitle>
//             <CardDescription>Track your wellness milestones</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4 pt-6">
//             {achievements.map((achievement, index) => (
//               <div\

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Brain, Calendar, Clock, Heart, Sparkles, TrendingUp, Award, Zap } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function Dashboard() {
  const userStats = {
    chatDuration: 20,
    moodScore: 7,
    sessionsThisWeek: 3,
    daysStreak: 5,
  }

  const mentalHealthTips = [
    {
      title: "Practice Mindful Breathing",
      description: "Take 5 minutes to focus on your breath. Inhale for 4 counts, hold for 2, exhale for 6.",
      icon: Brain,
      color: "from-cyan-400 to-blue-400",
      bgColor: "bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20",
    },
    {
      title: "Connect with Nature",
      description: "Spend at least 20 minutes outdoors today. Nature has a calming effect on our nervous system.",
      icon: Heart,
      color: "from-fuchsia-400 to-pink-400",
      bgColor: "bg-gradient-to-r from-fuchsia-50 to-pink-50 dark:from-fuchsia-900/20 dark:to-pink-900/20",
    },
  ]

  const achievements = [
    {
      name: "First Chat",
      description: "Completed your first conversation with ZenBot",
      progress: 100,
      icon: Award,
      color: "from-amber-400 to-orange-400",
    },
    {
      name: "Consistent Check-ins",
      description: "Chat with ZenBot 5 days in a row",
      progress: userStats.daysStreak * 20,
      icon: Calendar,
      color: "from-violet-400 to-fuchsia-400",
    },
    {
      name: "Mood Tracker",
      description: "Track your mood for 7 consecutive days",
      progress: 60,
      icon: TrendingUp,
      color: "from-emerald-400 to-green-400",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Badge className="mb-2 px-3 py-1 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white rounded-full shadow-glow-violet animate-pulse">
            <Sparkles className="h-3 w-3 mr-1 inline animate-sparkle" /> Your Wellness Hub
          </Badge>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-fuchsia-600 to-amber-600 dark:from-violet-400 dark:via-fuchsia-400 dark:to-amber-400 text-transparent bg-clip-text animate-gradient">
            Your Wellness Dashboard
          </h1>
        </div>
        <Link href="/chat">
          <Button className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-violet-600 hover:to-fuchsia-600 text-white border-0 shadow-glow-violet hover:shadow-glow-fuchsia transition-all animate-shimmer">
            Start a New Chat <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stats and Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
        {/* Progress Card */}
        <Card className="md:col-span-7 border-0 shadow-xl bg-gradient-to-br from-white to-violet-50 dark:from-slate-900 dark:to-violet-950/30 rounded-xl">
          <CardHeader className="pb-2 border-b border-violet-100 dark:border-slate-700 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10">
            <CardTitle className="bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 text-transparent bg-clip-text">
              Your Journey
            </CardTitle>
            <CardDescription>Track your progress and wellness metrics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Chat Duration */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="flex items-center"><Clock className="w-4 h-4 mr-1" /> Today's Chat Duration</span>
                <span>{userStats.chatDuration} minutes</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-slate-700">
                <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: `${userStats.chatDuration * 5}%` }} />
              </div>
            </div>

            {/* Mood Score */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-medium">
                <span className="flex items-center"><Heart className="w-4 h-4 mr-1" /> Weekly Mood Score</span>
                <span>{userStats.moodScore}/10</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-slate-700">
                <div className="h-full bg-gradient-to-r from-pink-400 to-fuchsia-500 rounded-full" style={{ width: `${userStats.moodScore * 10}%` }} />
              </div>
            </div>

            {/* Mini cards */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex flex-col items-center p-4 bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/30 dark:to-blue-900/30 rounded-xl shadow-md">
                <div className="rounded-full bg-gradient-to-r from-teal-400 to-blue-400 p-2 mb-2">
                  <Calendar className="h-5 w-5 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-400 dark:to-blue-400 text-transparent bg-clip-text">
                  {userStats.sessionsThisWeek}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Sessions this week</span>
              </div>
              <div className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl shadow-md">
                <div className="rounded-full bg-gradient-to-r from-purple-400 to-pink-400 p-2 mb-2">
                  <Zap className="h-5 w-5 text-white" />
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 text-transparent bg-clip-text">
                  {userStats.daysStreak}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">Day streak</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card className="md:col-span-5 border-0 shadow-xl bg-gradient-to-br from-white to-violet-50 dark:from-slate-900 dark:to-violet-950/30 rounded-xl">
          <CardHeader className="pb-2 border-b border-violet-100 dark:border-slate-700 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10">
            <CardTitle className="bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 text-transparent bg-clip-text">
              Achievements
            </CardTitle>
            <CardDescription>Celebrate your milestones and progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {achievements.map((ach, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="flex items-center"><ach.icon className="h-4 w-4 mr-1" /> {ach.name}</span>
                  <span>{ach.progress}%</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full dark:bg-slate-700">
                  <div className={`h-full rounded-full bg-gradient-to-r ${ach.color}`} style={{ width: `${ach.progress}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Mental Health Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentalHealthTips.map((tip, i) => (
          <Card key={i} className={`border-0 shadow-md ${tip.bgColor} transition-all`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 dark:from-violet-400 dark:to-fuchsia-400 text-transparent bg-clip-text">
                <tip.icon className="w-5 h-5" /> {tip.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
              <Link href="/resources">
                <Button className="mt-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                  Learn More
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
