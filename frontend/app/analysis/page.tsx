"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Upload, FileText, ImageIcon, AlertCircle, CheckCircle, ArrowLeft, Eye } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"
import { LanguageToggle } from "@/components/language-toggle"

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [analysisId, setAnalysisId] = useState<string | null>(null) // Initialize as null, set only after upload
  const { t, language } = useTranslation()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const handleChooseFile = () => fileInputRef.current?.click()
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    else if (e.type === "dragleave") setDragActive(false)
  }
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0])
  }
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) handleFile(e.target.files[0])
  }
  const handleFile = (file: File) => {
    const validTypes = [".pdf", ".png", ".jpg", ".jpeg"]
    if (!validTypes.some(type => file.name.toLowerCase().endsWith(type))) {
      alert("Please upload a PDF, PNG, JPG, or JPEG file.")
      return
    }
    setUploadedFile(file)
    uploadToBackend(file)
  }

  const uploadToBackend = async (file: File) => {
    setIsProcessing(true)
    setProgress(10)

    const formData = new FormData()
    formData.append("file_path", file)

    try {
      const response = await fetch("http://127.0.0.1:8000/contract_app/analyze/", {
        method: "POST",
        body: formData,
      })

      setProgress(60)

      const data = await response.json()
      if (response.ok) {
        setProgress(100)
        setIsComplete(true)
        const newAnalysisId = data.id // Adjust based on backend response field
        if (newAnalysisId) {
          setAnalysisId(newAnalysisId)
          router.push(`/analysis?id=${newAnalysisId}`)
        }
      } else {
        throw new Error(data.error || "Upload failed")
      }
    } catch (error) {
      console.error("Upload error:", error)
      alert(`File upload failed: ${error instanceof Error ? error.message : "An unexpected error occurred."}`)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
            <ArrowLeft className="h-5 w-5" />
            <span>{t("common.back")}</span>
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("upload.title")}</h1>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">{t("upload.subtitle")}</h2>
          <p className="text-gray-600">{t("upload.description")}</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              {t("upload.choose.title")}
            </CardTitle>
            <CardDescription>{t("upload.choose.description")}</CardDescription>
          </CardHeader>
          <CardContent>
            {!uploadedFile ? (
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-green-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex space-x-4">
                    <FileText className="h-12 w-12 text-gray-400" />
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-lg font-medium text-gray-700 mb-2">
                    {language === "en" ? "Drag and drop your contract here" : "আপনার চুক্তি এখানে টেনে আনুন"}
                  </p>
                  <p className="text-gray-500 mb-4">
                    {language === "en" ? "or click to browse files" : "অথবা ফাইল ব্রাউজ করতে ক্লিক করুন"}
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileInput}
                  />
                  <Button onClick={handleChooseFile} className="bg-green-600 hover:bg-green-700" type="button">
                    {t("upload.choose.button")}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                  <FileText className="h-8 w-8 text-green-600" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{uploadedFile.name}</p>
                    <p className="text-sm text-gray-600">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>

                {isProcessing && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Processing...</span>
                      <span className="text-sm text-gray-500">{progress}%</span>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-gray-600 text-center">
                      আমরা আপনার চুক্তি বিশ্লেষণ করছি...
                    </p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {isComplete && analysisId && (
          <Card className="mb-8 border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center text-green-700">
                <CheckCircle className="mr-2 h-5 w-5" />
                Analysis Complete! / বিশ্লেষণ সম্পূর্ণ!
              </CardTitle>
              <CardDescription>Your contract has been analyzed. Click below to view the results.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={`/analysis?id=${analysisId}`} className="flex-1">
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Eye className="mr-2 h-4 w-4" />
                    View Analysis / বিশ্লেষণ দেখুন
                  </Button>
                </Link>
                <Link href={`/chat?id=${analysisId}`} className="flex-1">
                  <Button variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50">
                    Ask Questions / প্রশ্ন করুন
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-700">
              <AlertCircle className="mr-2 h-5 w-5" />
              Need Help? / সাহায্য প্রয়োজন?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Supported Documents:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• PDF files (.pdf)</li>
                  <li>• Images (.jpg, .png) - we'll use OCR</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">সমর্থিত নথি:</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• PDF ফাইল (.pdf)</li>
                  <li>• ছবি (.jpg, .png) - আমরা OCR ব্যবহার করব</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}