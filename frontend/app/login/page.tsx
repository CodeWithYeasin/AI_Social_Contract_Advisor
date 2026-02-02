"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, EyeOff, ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useTranslation } from "@/contexts/translation-context"
import { LanguageToggle } from "@/components/language-toggle"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login } = useAuth()
  const { language } = useTranslation()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const success = await login(email, password)
      if (success) {
        router.push("/")
      } else {
        setError(language === "en" ? "Invalid email or password" : "ভুল ইমেইল বা পাসওয়ার্ড")
      }
    } catch (err) {
      setError(language === "en" ? "Login failed. Please try again." : "লগইন ব্যর্থ। আবার চেষ্টা করুন।")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
          <ArrowLeft className="h-5 w-5" />
          <span>{language === "en" ? "Back to Home" : "হোমে ফিরুন"}</span>
        </Link>
        <LanguageToggle />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold">{language === "en" ? "Welcome Back" : "স্বাগতম"}</CardTitle>
          <CardDescription>
            {language === "en" ? "Sign in to your Contract Advisor account" : "আপনার চুক্তি উপদেষ্টা অ্যাকাউন্টে সাইন ইন করুন"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{language === "en" ? "Email" : "ইমেইল"}</Label>
              <Input
                id="email"
                type="email"
                placeholder={language === "en" ? "Enter your email" : "আপনার ইমেইল লিখুন"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{language === "en" ? "Password" : "পাসওয়ার্ড"}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={language === "en" ? "Enter your password" : "আপনার পাসওয়ার্ড লিখুন"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <Alert className="bg-red-50 border-red-200">
                <AlertDescription className="text-red-800">{error}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {language === "en" ? "Signing in..." : "সাইন ইন করা হচ্ছে..."}
                </>
              ) : language === "en" ? (
                "Sign In"
              ) : (
                "সাইন ইন"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {language === "en" ? "Don't have an account?" : "অ্যাকাউন্ট নেই?"}{" "}
              <Link href="/signup" className="text-green-600 hover:text-green-700 font-medium">
                {language === "en" ? "Sign up" : "সাইন আপ করুন"}
              </Link>
            </p>
          </div>

          {/* Demo credentials */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-700 font-medium mb-1">
              {language === "en" ? "Demo Credentials:" : "ডেমো তথ্য:"}
            </p>
            <p className="text-xs text-blue-600">
              {language === "en" ? "Email: demo@example.com" : "ইমেইল: demo@example.com"}
            </p>
            <p className="text-xs text-blue-600">{language === "en" ? "Password: 123456" : "পাসওয়ার্ড: 123456"}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
