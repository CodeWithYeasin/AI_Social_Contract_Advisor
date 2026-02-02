"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Calendar, FileText, MessageCircle, Shield } from "lucide-react"
import Link from "next/link"
import { useAuth } from "@/contexts/auth-context"
import { useTranslation } from "@/contexts/translation-context"
import { LanguageToggle } from "@/components/language-toggle"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function ProfilePage() {
  const { user } = useAuth()
  const { language } = useTranslation()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null
  }

  const stats = [
    {
      label: language === "en" ? "Contracts Analyzed" : "বিশ্লেষিত চুক্তি",
      value: "12",
      icon: FileText,
    },
    {
      label: language === "en" ? "Questions Asked" : "জিজ্ঞাসিত প্রশ্ন",
      value: "34",
      icon: MessageCircle,
    },
    {
      label: language === "en" ? "Risks Detected" : "সনাক্তকৃত ঝুঁকি",
      value: "8",
      icon: Shield,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
            <ArrowLeft className="h-5 w-5" />
            <span>{language === "en" ? "Back to Home" : "হোমে ফিরুন"}</span>
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{language === "en" ? "Profile" : "প্রোফাইল"}</h1>
          <p className="text-gray-600">
            {language === "en"
              ? "Manage your account and view your activity"
              : "আপনার অ্যাকাউন্ট পরিচালনা করুন এবং আপনার কার্যকলাপ দেখুন"}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <Avatar className="h-24 w-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-green-100 text-green-700 text-2xl">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription className="flex items-center justify-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{language === "en" ? "Member since" : "সদস্য হয়েছেন"}</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      <Calendar className="h-3 w-3 mr-1" />
                      {language === "en" ? "Dec 2024" : "ডিসেম্বর ২০২৪"}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      {language === "en" ? "Account Status" : "অ্যাকাউন্টের অবস্থা"}
                    </span>
                    <Badge className="bg-green-100 text-green-800">{language === "en" ? "Active" : "সক্রিয়"}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stats and Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Your Activity" : "আপনার কার্যকলাপ"}</CardTitle>
                <CardDescription>
                  {language === "en"
                    ? "Overview of your contract analysis activity"
                    : "আপনার চুক্তি বিশ্লেষণ কার্যকলাপের সংক্ষিপ্ত বিবরণ"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  {stats.map((stat, index) => {
                    const IconComponent = stat.icon
                    return (
                      <div key={index} className="text-center p-4 bg-green-50 rounded-lg">
                        <IconComponent className="h-8 w-8 text-green-600 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                        <div className="text-sm text-gray-600">{stat.label}</div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Quick Actions" : "দ্রুত কার্যক্রম"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <Link href="/upload">
                    <Button className="w-full bg-green-600 hover:bg-green-700 h-16">
                      <div className="text-center">
                        <FileText className="h-6 w-6 mx-auto mb-1" />
                        <div className="text-sm">
                          {language === "en" ? "Upload New Contract" : "নতুন চুক্তি আপলোড করুন"}
                        </div>
                      </div>
                    </Button>
                  </Link>
                  <Link href="/chat">
                    <Button variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50 h-16">
                      <div className="text-center">
                        <MessageCircle className="h-6 w-6 mx-auto mb-1" />
                        <div className="text-sm">{language === "en" ? "Ask AI Questions" : "AI কে প্রশ্ন করুন"}</div>
                      </div>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>{language === "en" ? "Recent Activity" : "সাম্প্রতিক কার্যকলাপ"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <FileText className="h-5 w-5 text-green-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {language === "en" ? "Analyzed land lease agreement" : "ভূমি ইজারা চুক্তি বিশ্লেষণ করেছেন"}
                      </p>
                      <p className="text-xs text-gray-500">{language === "en" ? "2 hours ago" : "২ ঘন্টা আগে"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {language === "en" ? "Asked about contract cancellation" : "চুক্তি বাতিল সম্পর্কে প্রশ্ন করেছেন"}
                      </p>
                      <p className="text-xs text-gray-500">{language === "en" ? "1 day ago" : "১ দিন আগে"}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Shield className="h-5 w-5 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">
                        {language === "en"
                          ? "Detected high-risk clause in loan agreement"
                          : "ঋণ চুক্তিতে উচ্চ ঝুঁকিপূর্ণ ধারা সনাক্ত করেছেন"}
                      </p>
                      <p className="text-xs text-gray-500">{language === "en" ? "3 days ago" : "৩ দিন আগে"}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
