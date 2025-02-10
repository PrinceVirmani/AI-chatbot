// pages/index.js
"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card } from "@/components/ui/card";
import { Send } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useEffect, useRef } from "react";

import { useChat } from "ai/react";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen w-full">
      <div className="flex flex-col items-center w-full max-w-4xl mx-auto h-full">
        <header className="w-full py-6 mb-4">
          <div className="flex h-14 items-center text-3xl justify-center">
            AI CHATBOT
          </div>
        </header>
        <div className="flex-1 w-full overflow-y-auto p-4 space-y-4 mb-20">
          {messages.map((message, index) => (
            <Card
              key={index}
              className={`p-4 ${
                message.role === "user"
                  ? "bg-primary/10"
                  : message.content.startsWith("Error:")
                  ? "bg-red-100 dark:bg-red-900/10"
                  : "bg-secondary/10"
              }`}
            >
              <div className="flex items-start space-x-2">
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground mb-1"></div>
                  <ReactMarkdown className="prose dark:prose-invert">
                    {message.content}
                  </ReactMarkdown>
                </div>
              </div>
            </Card>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="fixed bottom-0 w-full border-t p-4 bg-white">
          <div className="max-w-4xl mx-auto w-full">
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={handleInputChange}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
