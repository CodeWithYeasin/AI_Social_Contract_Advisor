"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Send, ArrowLeft, Bot, User, FileText } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "@/contexts/translation-context";
import { LanguageToggle } from "@/components/language-toggle";
import OpenAI from "openai";

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  isTranslating?: boolean;
  originalText?: string;
}

export default function ChatPage() {
  const { t, language, translateText } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Initialize OpenAI client with OpenRouter's DeepSeek endpoint
  const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY!,
    dangerouslyAllowBrowser: true,
  });

  // Initialize with welcome message
  useEffect(() => {
    const initializeChat = async () => {
      const welcomeText =
        "Hello! I'm your AI contract advisor. I can help you understand any legal document in simple terms.";
      const translatedWelcome = await translateText(welcomeText);

      setMessages([
        {
          id: 1,
          text: language === "en" ? welcomeText : translatedWelcome,
          isUser: false,
          timestamp: new Date(),
          originalText: welcomeText,
        },
      ]);
    };

    initializeChat();
  }, [language, translateText]);

  // Translate existing messages when language changes
  useEffect(() => {
    const translateMessages = async () => {
      const updatedMessages = await Promise.all(
        messages.map(async (message) => {
          if (!message.isUser && message.originalText) {
            const translated = await translateText(message.originalText);
            return {
              ...message,
              text: language === "en" ? message.originalText : translated,
            };
          }
          return message;
        }),
      );
      setMessages(updatedMessages);
    };

    if (messages.length > 0) {
      translateMessages();
    }
  }, [language]);

  const commonQuestions = [
    {
      en: "What does this clause mean?",
      bn: "এই ধারার অর্থ কী?",
    },
    {
      en: "Can I cancel this contract?",
      bn: "আমি কি এই চুক্তি বাতিল করতে পারি?",
    },
    {
      en: "What are the risks in this agreement?",
      bn: "এই চুক্তিতে কী ঝুঁকি আছে?",
    },
    {
      en: "What happens if I don't pay on time?",
      bn: "সময়মতো পেমেন্ট না করলে কী হবে?",
    },
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: text,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    try {
      const aiResponseText = await getAIResponse(text);
      const translatedResponse = await translateText(aiResponseText);

      const aiResponse: Message = {
        id: messages.length + 2,
        text: language === "en" ? aiResponseText : translatedResponse,
        isUser: false,
        timestamp: new Date(),
        originalText: aiResponseText,
      };
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: Message = {
        id: messages.length + 2,
        text: language === "en" ? "Sorry, something went wrong." : await translateText("Sorry, something went wrong."),
        isUser: false,
        timestamp: new Date(),
        originalText: "Sorry, something went wrong.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const getAIResponse = async (question: string): Promise<string> => {
    try {
      const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat:free",
        messages: [
          { role: "system", content: "You are an AI contract advisor. Provide clear, concise explanations of legal terms and contract-related questions in simple language." },
          { role: "user", content: question },
        ],
        stream: false,
      });

      return completion.choices[0].message.content || "No response received.";
    } catch (error) {
      console.error("DeepSeek API error:", error);
      throw error;
    }
  };

  const handleQuestionClick = (question: string) => {
    const questionText = language === "en" ? question : commonQuestions.find((q) => q.bn === question)?.en || question;
    handleSendMessage(questionText);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm mb-6">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-green-600 hover:text-green-700">
            <ArrowLeft className="h-5 w-5" />
            <span>{t("common.back")}</span>
          </Link>
          <div className="flex items-center space-x-4">
            <LanguageToggle />
          </div>
        </div>
      </header>

      <div className="container mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t("chat.title")}</h1>
          <h2 className="text-2xl font-semibold text-green-700 mb-4">{t("chat.subtitle")}</h2>
          <p className="text-gray-600">{t("chat.description")}</p>
        </div>

        {/* Chat Interface */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Chat Messages */}
          <div className="md:col-span-2 lg:col-span-2">
            <Card className="w-full h-auto min-h-[400px] max-h-[600px] flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center">
                  <Bot className="mr-2 h-5 w-5 text-green-600" />
                  Contract Advisor Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col overflow-y-auto">
                {/* Messages */}
                <div className="flex-1 space-y-4 mb-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] md:max-w-[70%] lg:max-w-[60%] rounded-lg p-3 ${
                          message.isUser ? "bg-green-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {!message.isUser && <Bot className="h-4 w-4 mt-1 text-green-600" />}
                          {message.isUser && <User className="h-4 w-4 mt-1" />}
                          <div className="flex-1">
                            <p className="text-sm">{message.text}</p>
                            {message.isTranslating && <p className="text-xs opacity-70 mt-1">Translating...</p>}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center space-x-2">
                          <Bot className="h-4 w-4 text-green-600" />
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="flex space-x-2">
                  <Input
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={t("chat.placeholder")}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputText)}
                    className="flex-1"
                  />
                  <Button onClick={() => handleSendMessage(inputText)} className="bg-green-600 hover:bg-green-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="space-y-6">
              {/* Common Questions */}
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-lg">{t("chat.common.questions")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {commonQuestions.map((q, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full text-left h-auto p-3 hover:bg-green-50 hover:border-green-300"
                      onClick={() => handleQuestionClick(language === "en" ? q.en : q.bn)}
                    >
                      <div className="text-sm">
                        <p className="font-medium">{language === "en" ? q.en : q.bn}</p>
                        <p className="text-green-700 mt-1">{language === "en" ? q.bn : q.en}</p>
                      </div>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Upload Prompt */}
              <Card className="w-full bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-700">
                    <FileText className="inline mr-2 h-5 w-5" />
                    {t("chat.upload.prompt")}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">
                    {language === "en"
                      ? "Upload your contract for personalized analysis and advice."
                      : "ব্যক্তিগতকৃত বিশ্লেষণ এবং পরামর্শের জন্য আপনার চুক্তি আপলোড করুন।"}
                  </p>
                  <Link href="/upload">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      {language === "en" ? "Upload Contract" : "চুক্তি আপলোড করুন"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}