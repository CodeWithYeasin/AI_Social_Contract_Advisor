"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Shield, MessageCircle, FileText, AlertTriangle, Users, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useTranslation } from "@/contexts/translation-context"
import { LanguageToggle } from "@/components/language-toggle"
import { useAuth } from "@/contexts/auth-context"
import { ProfileDropdown } from "@/components/profile-dropdown"

export default function HomePage() {
  const { t, language } = useTranslation()
  const { user } = useAuth()

  const contractTypes = [
    { en: "Land Lease Agreements", bn: "ভূমি ইজারা চুক্তি" },
    { en: "Micro-loan Contracts", bn: "ক্ষুদ্রঋণ চুক্তি" },
    { en: "Service Agreements", bn: "সেবা চুক্তি" },
    { en: "Employment Contracts", bn: "কর্মসংস্থান চুক্তি" },
    { en: "Insurance Policies", bn: "বীমা নীতি" },
    { en: "Rental Agreements", bn: "ভাড়া চুক্তি" },
  ]

  const features = [
    {
      icon: FileText,
      titleKey: "features.document.title",
      titleEn: "Document Analysis",
      titleBn: "নথি বিশ্লেষণ",
      descEn: "Upload any contract - PDF, Word, or even photos. We'll read it for you.",
      descBn: "যেকোনো চুক্তি আপলোড করুন - PDF, Word, বা এমনকি ছবি। আমরা আপনার জন্য এটি পড়ব।",
    },
    {
      icon: MessageCircle,
      titleKey: "features.explanations.title",
      titleEn: "Simple Explanations",
      titleBn: "সহজ ব্যাখ্যা",
      descEn: "Get explanations in both Bangla and English, written in everyday language.",
      descBn: "বাংলা এবং ইংরেজি উভয় ভাষায় দৈনন্দিন ভাষায় লেখা ব্যাখ্যা পান।",
    },
    {
      icon: AlertTriangle,
      titleKey: "features.risk.title",
      titleEn: "Risk Detection",
      titleBn: "ঝুঁকি সনাক্তকরণ",
      descEn: "We highlight risky clauses and unfair terms that could harm you.",
      descBn: "আমরা ঝুঁকিপূর্ণ ধারা এবং অন্যায্য শর্তাবলী হাইলাইট করি যা আপনার ক্ষতি করতে পারে।",
    },
    {
      icon: MessageCircle,
      titleKey: "features.questions.title",
      titleEn: "Ask Questions",
      titleBn: "প্রশ্ন করুন",
      descEn: "Chat with our AI about any part of your contract you don't understand.",
      descBn: "আপনার চুক্তির যেকোনো অংশ সম্পর্কে আমাদের AI এর সাথে চ্যাট করুন যা আপনি বুঝেন না।",
    },
    {
      icon: Shield,
      titleKey: "features.privacy.title",
      titleEn: "Privacy First",
      titleBn: "গোপনীয়তা প্রথম",
      descEn: "Your documents are processed securely and never stored permanently.",
      descBn: "আপনার নথিগুলি নিরাপদে প্রক্রিয়া করা হয় এবং স্থায়ীভাবে সংরক্ষণ করা হয় না।",
    },
    {
      icon: Users,
      titleKey: "features.community.title",
      titleEn: "Community Focus",
      titleBn: "সম্প্রদায়িক ফোকাস",
      descEn: "Built specifically for rural communities and local legal contexts.",
      descBn: "বিশেষভাবে গ্রামীণ সম্প্রদায় এবং স্থানীয় আইনি প্রসঙ্গের জন্য তৈরি।",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-green-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">{t("header.title")}</h1>
              <p className="text-sm text-gray-600">{t("header.subtitle")}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageToggle />
            {user ? (
              <ProfileDropdown />
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="outline" size="sm">
                    {language === "en" ? "Login" : "লগইন"}
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="bg-green-600 hover:bg-green-700">
                    {language === "en" ? "Sign Up" : "সাইন আপ"}
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{t("home.hero.title")}</h2>
            <h3 className="text-2xl md:text-3xl font-semibold text-green-700 mb-6">{t("home.hero.subtitle")}</h3>
            <p className="text-xl text-gray-700 mb-4 max-w-3xl mx-auto">{t("home.hero.description")}</p>
            <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">{t("home.hero.description.bn")}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/upload">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 w-full sm:w-auto">
                <Upload className="mr-2 h-5 w-5" />
                {t("home.cta.upload")} / {language === "en" ? "চুক্তি আপলোড করুন" : "Upload Contract"}
              </Button>
            </Link>
            <Link href="/chat">
              <Button
                size="lg"
                variant="outline"
                className="border-green-600 text-green-700 hover:bg-green-50 px-8 py-3 w-full sm:w-auto"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                {t("home.cta.chat")} / {language === "en" ? "প্রশ্ন করুন" : "Ask Questions"}
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center">
              <CheckCircle className="h-4 w-4 text-green-600 mr-1" />
              {t("common.free")} / {language === "en" ? "বিনামূল্যে" : "Free to Use"}
            </div>
            <div className="flex items-center">
              <Shield className="h-4 w-4 text-green-600 mr-1" />
              {t("common.secure")} / {language === "en" ? "নিরাপদ ও ব্যক্তিগত" : "Secure & Private"}
            </div>
            <div className="flex items-center">
              <Users className="h-4 w-4 text-green-600 mr-1" />
              {t("common.community")} / {language === "en" ? "সম্প্রদায়ের জন্য" : "Made for Communities"}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">{t("home.features.title")}</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">{t("home.features.subtitle")}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <Card key={index} className="border-green-200 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <IconComponent className="h-10 w-10 text-green-600 mb-2" />
                    <CardTitle className="text-lg">{language === "en" ? feature.titleEn : feature.titleBn}</CardTitle>
                    <CardDescription>{language === "en" ? feature.descEn : feature.descBn}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Common Contract Types */}
      <section className="py-16 px-4 bg-green-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {language === "en"
                ? "Contract Types We Handle / যে ধরনের চুক্তি আমরা পরিচালনা করি"
                : "যে ধরনের চুক্তি আমরা পরিচালনা করি / Contract Types We Handle"}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contractTypes.map((contract, index) => (
              <Card key={index} className="bg-white border-green-200">
                <CardContent className="p-4 text-center">
                  <p className="font-medium text-gray-900">{language === "en" ? contract.en : contract.bn}</p>
                  <p className="text-sm text-green-700 mt-1">{language === "en" ? contract.bn : contract.en}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-green-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h3 className="text-3xl font-bold mb-4">
            {language === "en"
              ? "Protect Yourself Today / আজই নিজেকে রক্ষা করুন"
              : "আজই নিজেকে রক্ষা করুন / Protect Yourself Today"}
          </h3>
          <p className="text-xl mb-8 opacity-90">
            {language === "en"
              ? "Don't let complex legal language put you at risk. Get clear, simple explanations now."
              : "জটিল আইনি ভাষা আপনাকে ঝুঁকিতে ফেলতে দেবেন না। এখনই স্পষ্ট, সহজ ব্যাখ্যা পান।"}
          </p>
          <Link href="/upload">
            <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-3">
              <Upload className="mr-2 h-5 w-5" />
              {language === "en" ? "Start Analyzing Your Contract" : "আপনার চুক্তি বিশ্লেষণ শুরু করুন"}
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-6 w-6 text-green-400" />
            <span className="text-lg font-semibold">AI Contract Advisor</span>
          </div>
          <p className="text-gray-400 mb-4">
            {language === "en"
              ? "Empowering rural communities through AI-powered legal assistance"
              : "AI-চালিত আইনি সহায়তার মাধ্যমে গ্রামীণ সম্প্রদায়কে ক্ষমতায়ন"}
          </p>
          <p className="text-sm text-gray-500">
            {language === "en"
              ? "Built with ❤️ for communities in Bangladesh and beyond"
              : "বাংলাদেশ এবং এর বাইরের সম্প্রদায়ের জন্য ❤️ দিয়ে তৈরি"}
          </p>
        </div>
      </footer>
    </div>
  )
}
