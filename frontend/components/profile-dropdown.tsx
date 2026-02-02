"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, LogOut, FileText, MessageCircle, ChevronDown } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { useTranslation } from "@/contexts/translation-context"
import Link from "next/link"

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { language } = useTranslation()

  if (!user) return null

  const handleLogout = () => {
    logout()
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="flex items-center space-x-2 hover:bg-green-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
          <AvatarFallback className="bg-green-100 text-green-700">{user.name.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="hidden sm:block text-sm font-medium">{user.name}</span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <Card className="absolute right-0 top-full mt-2 w-64 z-20 shadow-lg">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback className="bg-green-100 text-green-700">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link href="/profile" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  {language === "en" ? "Profile" : "প্রোফাইল"}
                </Button>
              </Link>
              <Link href="/upload" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="mr-2 h-4 w-4" />
                  {language === "en" ? "Upload Contract" : "চুক্তি আপলোড"}
                </Button>
              </Link>
              <Link href="/chat" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {language === "en" ? "Ask Questions" : "প্রশ্ন করুন"}
                </Button>
              </Link>
              <hr className="my-2" />
              <Button
                variant="ghost"
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                {language === "en" ? "Logout" : "লগআউট"}
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
