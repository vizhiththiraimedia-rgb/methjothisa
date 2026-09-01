"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLanguage } from "@/components/providers/language-provider";
import { useAuth } from "@/components/providers/auth-provider";
import { useToast } from "@/components/ui/toaster";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

const chatSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
});

type ChatFormData = z.infer<typeof chatSchema>;

export default function AIChatPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { addToast } = useToast();
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<ChatFormData>({
    resolver: zodResolver(chatSchema),
  });

  const onSubmit = async (data: ChatFormData) => {
    if (!user) {
      addToast({ title: "Please login", description: "You need to be logged in to use AI Chat", variant: "warning" });
      return;
    }

    setMessages((prev) => [...prev, { role: "user", content: data.message }]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: data.message }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const result = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: result.data.reply }]);
      reset();
    } catch (error) {
      addToast({ title: "Error", description: "Failed to send message", variant: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-display font-bold mb-4">AI Astrology Chat</h1>
            <p className="text-muted-foreground">Ask anything about astrology, your chart, or cosmic insights</p>
          </div>
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto">
                {messages.length === 0 && (
                  <div className="text-center py-12">
                    <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                    <p className="text-muted-foreground">Start a conversation with our AI astrologer</p>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] p-3 rounded-lg ${msg.role === "user" ? "bg-purple-600 text-white" : "bg-muted"}`}>
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && <div className="text-center text-muted-foreground">AI is thinking...</div>}
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
                <Input {...register("message")} placeholder="Ask about your chart..." className="flex-1" />
                <Button type="submit" variant="cosmic" disabled={isLoading}>Send</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
