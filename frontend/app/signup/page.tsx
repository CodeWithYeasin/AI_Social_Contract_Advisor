"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Eye, EyeOff, ArrowLeft, Loader2, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useTranslation } from "@/contexts/translation-context"
import { LanguageToggle } from "@/components/language-toggle"

export default function SignupPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { signup } = useAuth()
  const { language } = useTranslation()
  const router = useRouter()

  const validateForm = () => {
    if (!name.trim()) {
      return language === "en" ? "Name is required" : "নাম প্রয়োজন"
    }
    if (!email.trim()) {
      return language === "en" ? "Email is required" : "ইমেইল প্রয়োজন"
    }
    if (password.length < 6) {
      return language === "en" ? "Password must be at least 6 characters" : "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"
    }
    if (password !== confirmPassword) {
      return language === "en" ? "Passwords do not match" : "পাসওয়ার্ড মিলছে না"
    }
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const validationError = validateForm()
    if (validationError) {
      setError(validationError)
      return
    }

    setIsSubmitting(true)

    try {
      const success = await signup(name, email, password)
      if (success) {
        router.push("/")
      } else {
        setError(language === "en" ? "Signup failed. Please try again." : "সাইন আপ ব্যর্থ। আবার চেষ্টা করুন।")
      }
    } catch (err) {
      setError(language === "en" ? "Signup failed. Please try again." : "সাইন আপ ব্যর্থ। আবার চেষ্টা করুন।")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: "" }
    if (password.length < 6)
      return {
        strength: 1,
        text: language === "en" ? "Weak" : "দুর্বল",
      }
    if (password.length < 10)
      return {
        strength: 2,
        text: language === "en" ? "Medium" : "মাঝারি",
      }
    return {
      strength: 3,
      text: language === "en" ? "Strong" : "শক্তিশালী",
    }
  }

  const passwordStrength = getPasswordStrength(password)

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
          <CardTitle className="text-2xl font-bold">
            {language === "en" ? "Create Account" : "অ্যাকাউন্ট তৈরি করুন"}
          </CardTitle>
          <CardDescription>
            {language === "en"
              ? "Join Contract Advisor to protect yourself from unfair contracts"
              : "অন্যায্য চুক্তি থেকে নিজেকে রক্ষা করতে চুক্তি উপদেষ্টায় যোগ দিন"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{language === "en" ? "Full Name" : "পূর্ণ নাম"}</Label>
              <Input
                id="name"
                type="text"
                placeholder={language === "en" ? "Enter your full name" : "আপনার পূর্ণ নাম লিখুন"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

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
                  placeholder={language === "en" ? "Create a password" : "একটি পাসওয়ার্ড তৈরি করুন"}
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
              {password && (
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        passwordStrength.strength === 1
                          ? "bg-red-500 w-1/3"
                          : passwordStrength.strength === 2
                            ? "bg-yellow-500 w-2/3"
                            : passwordStrength.strength === 3
                              ? "bg-green-500 w-full"
                              : "w-0"
                      }`}
                    />
                  </div>
                  <span className="text-xs text-gray-600">{passwordStrength.text}</span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">{language === "en" ? "Confirm Password" : "পাসওয়ার্ড নিশ্চিত করুন"}</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder={language === "en" ? "Confirm your password" : "আপনার পাসওয়ার্ড নিশ্চিত করুন"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </Button>
              </div>
              {confirmPassword && password === confirmPassword && (
                <div className="flex items-center space-x-1 text-green-600">
                  <CheckCircle className="h-4 w-4" />
                  <span className="text-xs">{language === "en" ? "Passwords match" : "পাসওয়ার্ড মিলেছে"}</span>
                </div>
              )}
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
                  {language === "en" ? "Creating account..." : "অ্যাকাউন্ট তৈরি করা হচ্ছে..."}
                </>
              ) : language === "en" ? (
                "Create Account"
              ) : (
                "অ্যাকাউন্ট তৈরি করুন"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              {language === "en" ? "Already have an account?" : "ইতিমধ্যে অ্যাকাউন্ট আছে?"}{" "}
              <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                {language === "en" ? "Sign in" : "সাইন ইন করুন"}
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
