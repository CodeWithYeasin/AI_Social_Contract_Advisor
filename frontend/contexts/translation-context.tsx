"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "en" | "bn"

interface TranslationContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string, fallback?: string) => string
  translateText: (text: string) => Promise<string>
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined)

// Translation dictionary
const translations = {
  en: {
    // Header
    "header.title": "Contract Advisor",
    "header.subtitle": "চুক্তি উপদেষ্টা",
    "header.language": "বাংলা/English",

    // Home page
    "home.hero.title": "Understand Your Contracts",
    "home.hero.subtitle": "আপনার চুক্তি বুঝুন",
    "home.hero.description":
      "Don't sign what you don't understand. Our AI helps rural communities read and understand legal contracts in simple language.",
    "home.hero.description.bn":
      "যা বুঝেন না তাতে স্বাক্ষর করবেন না। আমাদের AI গ্রামীণ সম্প্রদায়কে সহজ ভাষায় আইনি চুক্তি পড়তে ও বুঝতে সাহায্য করে।",
    "home.cta.upload": "Upload Contract",
    "home.cta.chat": "Ask Questions",
    "home.features.title": "How We Help You",
    "home.features.subtitle": "Our AI breaks down complex legal language into simple terms you can understand",

    // Upload page
    "upload.title": "Upload Your Contract",
    "upload.subtitle": "আপনার চুক্তি আপলোড করুন",
    "upload.description": "Upload your contract document and we'll analyze it for you in simple language",
    "upload.choose.title": "Choose Your Document",
    "upload.choose.description": "Supported formats: PDF, Word documents, or images (JPG, PNG)",
    "upload.drag.text": "Drag and drop your contract here",
    "upload.choose.button": "Choose File",
    "upload.processing": "Processing...",
    "upload.complete": "Analysis Complete!",
    "upload.view.analysis": "View Analysis",

    // Chat page
    "chat.title": "Ask Your Questions",
    "chat.subtitle": "আপনার প্রশ্ন করুন",
    "chat.description": "Get instant answers about contracts and legal terms in simple language",
    "chat.placeholder": "Type your question here...",
    "chat.common.questions": "Common Questions",
    "chat.upload.prompt": "Have a Contract?",

    // Analysis page
    "analysis.title": "Contract Analysis Results",
    "analysis.subtitle": "চুক্তি বিশ্লেষণের ফলাফল",
    "analysis.description": "Here's what we found in your contract document",
    "analysis.risk.score": "Overall Risk Score",
    "analysis.tabs.risks": "Risk Factors",
    "analysis.tabs.positive": "Positive Aspects",
    "analysis.tabs.summary": "Summary",

    // Common
    "common.back": "Back to Home",
    "common.free": "Free to Use",
    "common.secure": "Secure & Private",
    "common.community": "Made for Communities",
    "common.high.risk": "HIGH RISK",
    "common.medium.risk": "MEDIUM RISK",
    "common.low.risk": "LOW RISK",
  },
  bn: {
    // Header
    "header.title": "চুক্তি উপদেষ্টা",
    "header.subtitle": "Contract Advisor",
    "header.language": "English/বাংলা",

    // Home page
    "home.hero.title": "আপনার চুক্তি বুঝুন",
    "home.hero.subtitle": "Understand Your Contracts",
    "home.hero.description":
      "যা বুঝেন না তাতে স্বাক্ষর করবেন না। আমাদের AI গ্রামীণ সম্প্রদায়কে সহজ ভাষায় আইনি চুক্তি পড়তে ও বুঝতে সাহায্য করে।",
    "home.hero.description.bn":
      "Don't sign what you don't understand. Our AI helps rural communities read and understand legal contracts in simple language.",
    "home.cta.upload": "চুক্তি আপলোড করুন",
    "home.cta.chat": "প্রশ্ন করুন",
    "home.features.title": "আমরা কীভাবে সাহায্য করি",
    "home.features.subtitle": "আমাদের AI জটিল আইনি ভাষাকে সহজ শব্দে ভেঙে দেয় যা আপনি বুঝতে পারেন",

    // Upload page
    "upload.title": "আপনার চুক্তি আপলোড করুন",
    "upload.subtitle": "Upload Your Contract",
    "upload.description": "আপনার চুক্তির নথি আপলোড করুন এবং আমরা আপনার জন্য সহজ ভাষায় এটি বিশ্লেষণ করব",
    "upload.choose.title": "আপনার নথি নির্বাচন করুন",
    "upload.choose.description": "সমর্থিত ফরম্যাট: PDF, Word নথি, বা ছবি (JPG, PNG)",
    "upload.drag.text": "আপনার চুক্তি এখানে টেনে আনুন",
    "upload.choose.button": "ফাইল নির্বাচন করুন",
    "upload.processing": "প্রক্রিয়াকরণ...",
    "upload.complete": "বিশ্লেষণ সম্পূর্ণ!",
    "upload.view.analysis": "বিশ্লেষণ দেখুন",

    // Chat page
    "chat.title": "আপনার প্রশ্ন করুন",
    "chat.subtitle": "Ask Your Questions",
    "chat.description": "চুক্তি এবং আইনি শর্তাবলী সম্পর্কে সহজ ভাষায় তাৎক্ষণিক উত্তর পান",
    "chat.placeholder": "এখানে আপনার প্রশ্ন লিখুন...",
    "chat.common.questions": "সাধারণ প্রশ্ন",
    "chat.upload.prompt": "চুক্তি আছে?",

    // Analysis page
    "analysis.title": "চুক্তি বিশ্লেষণের ফলাফল",
    "analysis.subtitle": "Contract Analysis Results",
    "analysis.description": "আপনার চুক্তির নথিতে আমরা যা পেয়েছি তা এখানে",
    "analysis.risk.score": "সামগ্রিক ঝুঁকির স্কোর",
    "analysis.tabs.risks": "ঝুঁকির কারণ",
    "analysis.tabs.positive": "ইতিবাচক দিক",
    "analysis.tabs.summary": "সারসংক্ষেপ",

    // Common
    "common.back": "হোমে ফিরুন",
    "common.free": "বিনামূল্যে",
    "common.secure": "নিরাপদ ও ব্যক্তিগত",
    "common.community": "সম্প্রদায়ের জন্য",
    "common.high.risk": "উচ্চ ঝুঁকি",
    "common.medium.risk": "মাঝারি ঝুঁকি",
    "common.low.risk": "কম ঝুঁকি",
  },
}

export function TranslationProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("preferred-language") as Language
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "bn")) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("preferred-language", lang)
  }

  const t = (key: string, fallback?: string): string => {
    const translation = translations[language][key as keyof (typeof translations)["en"]]
    return translation || fallback || key
  }

  // Simulate translation API for dynamic content
  const translateText = async (text: string): Promise<string> => {
    if (language === "en") return text

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Simple translation simulation for common phrases
    const commonTranslations: Record<string, string> = {
      "Hello! I'm your AI contract advisor.": "হ্যালো! আমি আপনার AI চুক্তি উপদেষ্টা।",
      "What does this clause mean?": "এই ধারার অর্থ কী?",
      "Can I cancel this contract?": "আমি কি এই চুক্তি বাতিল করতে পারি?",
      "What are the risks in this agreement?": "এই চুক্তিতে কী ঝুঁকি আছে?",
      "What happens if I don't pay on time?": "সময়মতো পেমেন্ট না করলে কী হবে?",
      "That's a great question!": "এটি একটি দুর্দান্ত প্রশ্ন!",
      "I can help explain that.": "আমি এটি ব্যাখ্যা করতে সাহায্য করতে পারি।",
      "Let me break this down for you.": "আমি আপনার জন্য এটি ব্যাখ্যা করি।",
      "That's an important concern.": "এটি একটি গুরুত্বপূর্ণ উদ্বেগ।",
    }

    return commonTranslations[text] || `[অনুবাদ] ${text}`
  }

  return (
    <TranslationContext.Provider value={{ language, setLanguage: handleSetLanguage, t, translateText }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (context === undefined) {
    throw new Error("useTranslation must be used within a TranslationProvider")
  }
  return context
}
