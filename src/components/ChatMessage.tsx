import { Avatar, AvatarFallback } from "./ui/avatar";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export function ChatMessage({ message, isUser, timestamp }: ChatMessageProps) {
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <Avatar className="w-8 h-8">
        <AvatarFallback className={isUser ? "bg-primary text-primary-foreground" : "bg-secondary"}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={`max-w-[80%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div
          className={`px-3 py-2 rounded-lg ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-sm"
              : "bg-muted text-muted-foreground rounded-bl-sm"
          }`}
        >
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground">
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
}