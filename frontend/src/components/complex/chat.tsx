"use client"

import { useState } from "react"
import { useEffect,useRef } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Send } from "lucide-react"
import { API_BASE_URL } from "@/lib/config"

export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 0, text: "¡Hola! ¿En qué puedo ayudarte?", sender: "bot" },
  ])
  const [input, setInput] = useState("")

  const sendMessage = async () => {
    if (!input.trim()) return
    const content = input
    const newMessage = { id: Date.now(), text: content, sender: "user" as const }
    setMessages((prev) => [...prev, newMessage])
    setInput("")

    try {
      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ conversation_id: 1, content }),
      })
      const data = await response.json()
      console.log(data);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: data.content, sender: "bot" as const },
      ])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), text: "No se pudo enviar el mensaje. Intenta de nuevo.", sender: "bot" as const },
      ])
      console.error("Error enviando mensaje.", error)
    }
  }

  const chatViewportRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const viewport = chatViewportRef.current
    if (!viewport) return
    viewport.scrollTop = viewport.scrollHeight
  }, [messages])

  return (
    <Card className="h-screen w-full max-w-2xl mx-auto flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Chat de Soporte</h2>
      </div>
      
      <ScrollArea viewportRef={chatViewportRef} className="overflow-y-auto flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : ""}`}>
              <Avatar className="h-8 w-8">
                <AvatarFallback>{msg.sender === "bot" ? "🤖" : "👤"}</AvatarFallback>
              </Avatar>
              <div className={`rounded-lg px-4 py-2 max-w-[70%] ${
                msg.sender === "bot" ? "bg-muted" : "bg-primary text-primary-foreground"
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t flex gap-2">
        <Input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Escribe tu mensaje..."
          className="flex-1"
        />
        <Button onClick={sendMessage} size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  )
}