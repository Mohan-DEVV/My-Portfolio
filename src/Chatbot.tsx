import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Sparkles, Loader2 } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const CHAT_API_URL = 'http://localhost:3001/api/chat';

const WELCOME_MESSAGE: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hey there! 👋 I'm Mohan's AI assistant. Ask me anything about his skills, experience, projects, or how to get in touch!",
  timestamp: new Date(),
};

const SUGGESTED_QUESTIONS = [
  "What are Mohan's skills?",
  "Tell me about his experience",
  "How can I contact Mohan?",
];

// Simple markdown-like formatting
function formatMessage(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold text
    let formatted: React.ReactNode = line;
    const boldParts = line.split(/\*\*(.*?)\*\*/g);
    if (boldParts.length > 1) {
      formatted = boldParts.map((part, j) =>
        j % 2 === 1 ? <strong key={j} className="text-white font-semibold">{part}</strong> : part
      );
    }
    
    // Bullet points
    if (line.trim().startsWith('- ') || line.trim().startsWith('• ')) {
      return (
        <div key={i} className="flex gap-2 ml-2 my-0.5">
          <span className="text-azure-blue mt-0.5 shrink-0">•</span>
          <span>{typeof formatted === 'string' ? line.trim().substring(2) : formatted}</span>
        </div>
      );
    }

    return (
      <React.Fragment key={i}>
        {formatted}
        {i < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Pulse effect for new messages when chat is closed
  useEffect(() => {
    if (!isOpen && messages.length > 1 && messages[messages.length - 1].role === 'assistant') {
      setHasNewMessage(true);
      const timer = setTimeout(() => setHasNewMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [messages, isOpen]);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Build conversation history (exclude welcome message)
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({ role: m.role, content: m.content }));
      
      history.push({ role: 'user', content: content.trim() });

      const response = await fetch(CHAT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: "Oops! I'm having trouble connecting right now. Please try again in a moment, or reach out to Mohan directly at mohanvamsivoora@gmail.com 📧",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleSuggestedQuestion = (question: string) => {
    sendMessage(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-gradient-to-br from-azure-blue to-azure-light shadow-2xl shadow-azure-blue/40 flex items-center justify-center text-white cursor-pointer group"
            id="chatbot-toggle"
          >
            <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
            
            {/* Notification pulse */}
            {hasNewMessage && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full animate-ping" />
            )}
            
            {/* Ambient glow rings */}
            <div className="absolute inset-0 rounded-full bg-azure-blue/20 animate-ping" style={{ animationDuration: '3s' }} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-[9999] w-[400px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-3rem)] flex flex-col chatbot-window"
            id="chatbot-window"
          >
            {/* Header */}
            <div className="chatbot-header flex items-center justify-between px-5 py-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-azure-blue to-azure-light flex items-center justify-center">
                    <Sparkles size={20} className="text-white" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#0a0a0a]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-sm">Mohan's AI Assistant</h3>
                  <p className="text-[11px] text-emerald-400 font-medium">● Online — Powered by Mistral</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all"
                id="chatbot-close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 chatbot-messages">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                    msg.role === 'assistant' 
                      ? 'bg-gradient-to-br from-azure-blue/30 to-azure-light/30 text-azure-blue' 
                      : 'bg-white/10 text-gray-400'
                  }`}>
                    {msg.role === 'assistant' ? <Bot size={14} /> : <User size={14} />}
                  </div>
                  
                  {/* Bubble */}
                  <div className={`max-w-[80%] px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'assistant'
                      ? 'chatbot-bubble-assistant rounded-2xl rounded-tl-md'
                      : 'chatbot-bubble-user rounded-2xl rounded-tr-md'
                  }`}>
                    {msg.role === 'assistant' ? formatMessage(msg.content) : msg.content}
                  </div>
                </motion.div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-azure-blue/30 to-azure-light/30 text-azure-blue flex items-center justify-center shrink-0 mt-1">
                    <Bot size={14} />
                  </div>
                  <div className="chatbot-bubble-assistant rounded-2xl rounded-tl-md px-4 py-3">
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Loader2 size={14} className="animate-spin text-azure-blue" />
                      <span>Thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Suggested questions (show only after welcome) */}
              {messages.length === 1 && !isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap gap-2 mt-2"
                >
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSuggestedQuestion(q)}
                      className="chatbot-suggestion px-3 py-1.5 text-xs"
                    >
                      {q}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="chatbot-input-area px-4 py-3 shrink-0">
              <div className="flex items-center gap-2 chatbot-input-wrapper">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Mohan..."
                  disabled={isLoading}
                  className="chatbot-input flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none px-4 py-3"
                  id="chatbot-input"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="chatbot-send-btn w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all"
                  id="chatbot-send"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="text-[10px] text-gray-600 text-center mt-2 font-mono">
                Powered by Mistral AI • Responses may vary
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
