import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
}

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUser }) => {
  // Xử lý text trước khi render với ReactMarkdown
  // Chuyển đổi '\n' thành xuống dòng trong Markdown 
  const formattedMessage = message.replace(/\\n/g, '\n');

  return (
    <div
      className={`flex ${
        isUser ? 'justify-end' : 'justify-start'
      } mb-4`}
    >
      <div
        className={`max-w-[90%] md:max-w-[80%] rounded-lg px-3 py-2 ${
          isUser
            ? 'bg-blue-600 text-white rounded-tr-none'
            : 'bg-gray-800 text-gray-100 rounded-tl-none'
        }`}
      >
        <ReactMarkdown 
          className="prose prose-invert prose-sm sm:prose-base max-w-none break-words whitespace-pre-line"
          components={{
            a: ({ node, ...props }) => (
              <a {...props} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer" />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className="my-1" />
            ),
            ul: ({ node, ...props }) => (
              <ul {...props} className="list-disc pl-5 my-2" />
            ),
            ol: ({ node, ...props }) => (
              <ol {...props} className="list-decimal pl-5 my-2" />
            ),
            li: ({ node, ...props }) => (
              <li {...props} className="my-1" />
            ),
            code: ({ node, inline, className, children, ...props }: CodeProps) => {
              return inline 
                ? <code {...props} className="bg-gray-700 px-1 py-0.5 rounded text-sm">{children}</code>
                : <code {...props} className="block bg-gray-700 p-2 rounded-md text-sm my-2 overflow-x-auto">{children}</code>
            }
          }}
        >
          {formattedMessage}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default ChatMessage; 