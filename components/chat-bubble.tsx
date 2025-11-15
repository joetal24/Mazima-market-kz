import { Message, User } from "@/src/db/schemas";

interface ChatBubbleProps {
  message: Message;
  sender: User;
  isCurrentUser: boolean;
}

export function ChatBubble({ message, sender, isCurrentUser }: ChatBubbleProps) {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div
      className={`flex gap-3 mb-4 ${isCurrentUser ? "flex-row-reverse" : "flex-row"}`}
    >
      <div
        className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
          isCurrentUser ? "bg-orange-200 text-orange-900" : "bg-green-200 text-green-900"
        }`}
      >
        {sender.name?.charAt(0).toUpperCase()}
      </div>
      <div className={`flex flex-col ${isCurrentUser ? "items-end" : "items-start"}`}>
        <p className="text-xs text-muted-foreground mb-1">
          {sender.name} • {formatTime(message.createdAt)}
        </p>
        <div
          className={`px-4 py-2 rounded-lg max-w-xs ${
            isCurrentUser
              ? "bg-orange-100 text-orange-900"
              : "bg-green-100 text-green-900"
          }`}
        >
          <p className="text-sm break-words">{message.content}</p>
        </div>
      </div>
    </div>
  );
}
