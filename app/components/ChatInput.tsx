import { useState, FormEvent } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  onOpenFeedback: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, onOpenFeedback }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="sticky bottom-0 bg-gray-900 border-t border-gray-800 p-3">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Nhập câu hỏi của bạn..."
            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
            autoComplete="off"
          />
          <button
            type="submit"
            disabled={!message.trim() || isLoading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[60px]"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Gửi'
            )}
          </button>
        </form>
        
        {/* Nút góp ý */}
        <button
          type="button"
          onClick={onOpenFeedback}
          className="w-full mt-2 py-2 px-3 bg-gray-800 border border-gray-700 text-gray-200 hover:bg-gray-700 rounded-md transition-colors"
        >
          Góp ý cho Admin
        </button>
      </div>
    </div>
  );
};

export default ChatInput; 