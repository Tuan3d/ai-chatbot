'use client';

import React, { useState, useRef, useEffect } from 'react';

interface FeedbackFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ isOpen, onClose }) => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<{
    type: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({
    type: 'idle',
    message: '',
  });
  
  const modalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Đóng modal khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node) && 
          formRef.current && !formRef.current.contains(event.target as Node)) {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Đóng modal với ESC key
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedback.trim()) {
      setStatus({
        type: 'error',
        message: 'Vui lòng nhập nội dung góp ý',
      });
      return;
    }
    
    try {
      setStatus({
        type: 'loading',
        message: 'Đang gửi góp ý...',
      });
      
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          feedback,
          email: email.trim() || undefined,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Đã xảy ra lỗi khi gửi góp ý');
      }
      
      setFeedback('');
      setEmail('');
      setStatus({
        type: 'success',
        message: 'Cảm ơn bạn đã gửi góp ý!',
      });
      
      // Tự động đóng sau khi gửi thành công
      setTimeout(() => {
        onClose();
        setStatus({
          type: 'idle',
          message: '',
        });
      }, 2000);
    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Đã xảy ra lỗi khi gửi góp ý',
      });
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 md:p-6">
      <div ref={modalRef} className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Góp ý</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200"
            aria-label="Đóng"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form ref={formRef} onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-300 mb-1">
              Nội dung góp ý <span className="text-red-500">*</span>
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Nhập góp ý của bạn..."
              className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 border-gray-600"
              rows={4}
              maxLength={1000}
              required
              autoFocus
            />
            <p className="text-xs text-right text-gray-400 mt-1">
              {feedback.length}/1000 ký tự
            </p>
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email (không bắt buộc)
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Địa chỉ email của bạn"
              className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 border-gray-600"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {status.type === 'loading' ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Đang gửi
                </>
              ) : (
                'Gửi góp ý'
              )}
            </button>
          </div>
          
          {status.message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                status.type === 'error'
                  ? 'bg-red-900/30 text-red-400'
                  : status.type === 'success'
                  ? 'bg-green-900/30 text-green-400'
                  : ''
              }`}
            >
              {status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm; 