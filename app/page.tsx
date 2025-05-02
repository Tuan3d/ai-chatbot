'use client';

import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar';
import ChatHistory, { Message } from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import FeedbackForm from './components/FeedbackForm';

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Tạo tin nhắn mới từ người dùng
    const userMessage: Message = {
      id: uuidv4(),
      text,
      isUser: true,
    };

    // Cập nhật danh sách tin nhắn
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Gửi tin nhắn đến API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      // Tạo tin nhắn phản hồi từ AI
      const botMessage: Message = {
        id: uuidv4(),
        text: data.response || 'Xin lỗi, tôi không thể xử lý yêu cầu của bạn.',
        isUser: false,
      };

      // Cập nhật danh sách tin nhắn
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Lỗi khi gửi tin nhắn:', error);
      
      // Thêm tin nhắn lỗi
      const errorMessage: Message = {
        id: uuidv4(),
        text: 'Đã xảy ra lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại.',
        isUser: false,
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-900">
      <Navbar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <ChatHistory messages={messages} />
        <ChatInput 
          onSendMessage={handleSendMessage} 
          isLoading={isLoading} 
          onOpenFeedback={() => setIsFeedbackOpen(true)}
        />
        
        {/* Form góp ý */}
        <FeedbackForm 
          isOpen={isFeedbackOpen} 
          onClose={() => setIsFeedbackOpen(false)} 
        />
      </div>
    </div>
  );
} 