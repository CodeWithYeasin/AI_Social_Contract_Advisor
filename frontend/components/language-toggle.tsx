"use client"

import { Button } from "@/components/ui/button"
import { Languages } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

export function LanguageToggle() {
  const { language, setLanguage, t } = useTranslation()

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "bn" : "en")
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center space-x-2 bg-green-100 text-green-800 border-green-300 hover:bg-green-200"
    >
      <Languages className="h-3 w-3" />
      <span className="text-xs font-medium">{language === "en" ? "বাংলা" : "English"}</span>
    </Button>
  )
}
