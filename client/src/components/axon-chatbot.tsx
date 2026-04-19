import { useState, useRef, useEffect } from 'react';
import { X, Maximize2, Minimize2, Palette, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface AxonChatbotProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function AxonChatbot({ isVisible, onClose }: AxonChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm AXON, DARK's AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://portfolio-wj99.onrender.com';
      const response = await fetch(`${apiBase}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(inputValue);
    }
  };

  if (!isVisible) return null;

  const chatWindowClass = isMobile 
    ? 'fixed inset-0 bg-white flex flex-col z-50'
    : `fixed bottom-24 right-6 bg-white rounded-lg shadow-2xl flex flex-col z-50 transition-all duration-300 ${
        isExpanded ? 'w-96 h-96' : 'w-80 h-80'
      }`;
  
  const inputPadding = isMobile ? 'p-4' : (isExpanded ? 'p-4' : 'p-3');

  return (
    <div className={`${chatWindowClass} animate-slideIn`}>
      {/* Header */}
      <div className="bg-black text-white p-4 flex justify-between items-center rounded-t-lg">
        <span className="font-semibold">AXON</span>
        <div className="flex space-x-2">
          {!isMobile && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 hover:bg-gray-800 rounded transition-colors"
            >
              {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-800 rounded transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.isUser
                  ? 'bg-black text-white ml-auto'
                  : 'bg-gray-100 text-black mr-auto'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-black px-4 py-2 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className={`${inputPadding} border-t`}>
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black bg-white text-black placeholder-gray-500 min-w-0"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !inputValue.trim()}
            className={`${isExpanded ? 'px-4 py-2' : 'px-3 py-2'} bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex-shrink-0 min-w-[60px]`}
          >
            Send
          </button>
        </div>
      </form>


    </div>
  );
}

export function AxonChatButton() {
  const [showChat, setShowChat] = useState(false);
  const [showChatIcon, setShowChatIcon] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Listen for custom event from hero section
    const handleOpenChat = () => {
      setShowChatIcon(true);
      setShowChat(true);
    };
    
    window.addEventListener('openAxonChat', handleOpenChat);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('openAxonChat', handleOpenChat);
    };
  }, []);

  // On mobile, show chat icon immediately
  useEffect(() => {
    if (isMobile) {
      setShowChatIcon(true);
    }
  }, [isMobile]);

  const handleChatClick = () => {
    setShowChat(true);
  };

  return (
    <>
      {/* Chat Icon - Show only after homepage button click or on mobile */}
      {showChatIcon && !showChat && (
        <button
          onClick={handleChatClick}
          className="fixed bottom-6 right-6 w-12 h-12 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center z-40 animate-fadeIn"
        >
          <MessageCircle size={20} />
        </button>
      )}

      {/* Chat Interface */}
      <AxonChatbot 
        isVisible={showChat} 
        onClose={() => {
          setShowChat(false);
        }} 
      />
    </>
  );
}