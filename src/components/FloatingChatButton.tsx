import { Button } from "./ui/button";
import { MessageCircle, X } from "lucide-react";
import { motion } from "motion/react";

interface FloatingChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
  unreadCount?: number;
}

export function FloatingChatButton({ isOpen, onClick, unreadCount = 0 }: FloatingChatButtonProps) {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <Button
        onClick={onClick}
        className="w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow relative"
        size="icon"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </motion.div>
        
        {unreadCount > 0 && !isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </motion.div>
        )}
      </Button>
    </motion.div>
  );
}