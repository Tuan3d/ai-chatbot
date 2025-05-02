import { useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import Image from 'next/image';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface ChatHistoryProps {
  messages: Message[];
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Cuộn xuống cuối cùng khi có tin nhắn mới
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-900 text-white">
        <div className="mb-6">
          <Image src="/bot.svg" alt="AI Chatbot Logo" width={64} height={64} />
        </div>
        <h2 className="text-xl font-semibold mb-2">Xin chào! Tôi có thể giúp gì cho bạn?</h2>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto scrollbar-hide bg-gray-900 p-4">
      <div className="max-w-3xl mx-auto">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.text}
            isUser={message.isUser}
          />
        ))}
        <div ref={messagesEndRef} className="pt-2" />
      </div>
    </div>
  );
};

export default ChatHistory; 