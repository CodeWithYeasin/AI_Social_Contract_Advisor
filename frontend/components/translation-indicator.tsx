"use client"

import { Badge } from "@/components/ui/badge"
import { Languages, Loader2 } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

interface TranslationIndicatorProps {
  isTranslating?: boolean
}

export function TranslationIndicator({ isTranslating = false }: TranslationIndicatorProps) {
  const { language } = useTranslation()

  if (isTranslating) {
    return (
      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
        <Loader2 className="h-3 w-3 mr-1 animate-spin" />
        Translating...
      </Badge>
    )
  }

  return (
    <Badge variant="secondary" className="bg-green-100 text-green-800">
      <Languages className="h-3 w-3 mr-1" />
      {language === "en" ? "English" : "বাংলা"}
    </Badge>
  )
}
