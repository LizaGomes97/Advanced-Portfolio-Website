import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { ChatMessage } from "./ChatMessage";
import { FloatingChatButton } from "./FloatingChatButton";
import { Send, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AI_RESPONSES = [
  "Olá! Como posso ajudá-lo hoje?",
  "Entendo sua pergunta. Deixe-me pensar em uma resposta adequada.",
  "Essa é uma questão interessante! Posso explicar isso melhor.",
  "Fico feliz em poder ajudar! Há mais alguma coisa que gostaria de saber?",
  "Claro! Vou fazer o meu melhor para esclarecer isso para você.",
  "Obrigado por sua pergunta. Aqui está o que posso compartilhar sobre isso.",
  "Essa é uma ótima pergunta! Vou explicar passo a passo.",
  "Posso ajudar com isso. Deixe-me fornecer algumas informações úteis."
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Add welcome message when chat opens for the first time
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: "Olá! Sou seu assistente virtual. Como posso ajudá-lo hoje?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const randomResponse = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)];
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);

      // If chat is closed, increment unread count
      if (!isOpen) {
        setUnreadCount(prev => prev + 1);
      }
    }, 1000 + Math.random() * 2000); // Random delay between 1-3 seconds
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setUnreadCount(0); // Clear unread count when opening
    }
  };

  return (
    <>
      <FloatingChatButton
        isOpen={isOpen}
        onClick={toggleChat}
        unreadCount={unreadCount}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 z-40 w-80 h-96 max-w-[calc(100vw-3rem)] max-h-[calc(100vh-8rem)]"
          >
            <Card className="h-full flex flex-col shadow-2xl">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Assistente Virtual</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleChat}
                    className="h-8 w-8"
                  >
                    <Minimize2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Online
                </div>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-0">
                <ScrollArea ref={scrollAreaRef} className="flex-1 px-4">
                  <div className="space-y-4 py-2">
                    {messages.map((message) => (
                      <ChatMessage
                        key={message.id}
                        message={message.text}
                        isUser={message.isUser}
                        timestamp={message.timestamp}
                      />
                    ))}
                    
                    {isTyping && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                          <div className="flex gap-1">
                            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-1 h-1 bg-muted-foreground rounded-full animate-bounce"></div>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground flex items-center">
                          Digitando...
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="border-t p-4">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Digite sua mensagem..."
                      disabled={isTyping}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isTyping}
                      size="icon"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}