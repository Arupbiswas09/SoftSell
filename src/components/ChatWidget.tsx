import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const INITIAL_MESSAGE: Message = {
  type: 'bot',
  content: "✨ Hello! I'm SoftBot, your AI license valuation expert. I can help you:\n\n• Get instant license valuations\n• Understand the selling process\n• Learn about our security measures\n• Explore payment options\n\nWhat would you like to know?",
  timestamp: new Date(),
};

const PREDEFINED_RESPONSES: { [key: string]: string } = {
  'pricing': "💰 Our dynamic pricing model typically helps companies recover 40-70% of original license costs. Here's what affects valuation:\n\n• License type and version\n• Remaining duration\n• Market demand\n• Volume discounts\n\nWould you like a personalized quote?",
  'process': "🚀 Our streamlined process is designed for efficiency:\n\n1. **Upload License Details**\n   • Basic information\n   • Current usage stats\n\n2. **Receive Valuation**\n   • Market-based pricing\n   • 24-hour turnaround\n\n3. **Complete Sale**\n   • Secure transfer\n   • Fast payment\n\nReady to start?",
  'security': "🔒 Enterprise-Grade Security:\n\n• End-to-end encryption\n• SOC 2 Type II certified\n• Regular penetration testing\n• Secure escrow services\n• Vendor-approved transfers\n\nYour licenses are safe with us.",
  'payment': "💳 Flexible Payment Options:\n\n• **Speed**: 48-hour processing\n• **Methods**:\n  - Wire transfer\n  - ACH payments\n  - International transfers\n• **Security**: Bank-level encryption\n\nWhat's your preferred payment method?",
};

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and typing
    const thinkingTime = 1000 + Math.random() * 1500;
    setTimeout(() => {
      const response = generateResponse(input.toLowerCase());
      const botMessage: Message = {
        type: 'bot',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, thinkingTime);
  };

  const generateResponse = (input: string): string => {
    const keywords = Object.keys(PREDEFINED_RESPONSES);
    const matchedKeyword = keywords.find(keyword => input.includes(keyword));
    
    if (matchedKeyword) {
      return PREDEFINED_RESPONSES[matchedKeyword];
    }

    // Smart fallback responses
    if (input.includes('help') || input.includes('support')) {
      return "🤝 I'm here to help! Would you like to know about:\n\n• License valuation process\n• Security measures\n• Payment options\n• Success stories";
    }

    if (input.includes('time') || input.includes('long')) {
      return "⚡ Our process is fast:\n\n• Instant preliminary quote\n• 24h detailed valuation\n• 48h payment processing\n\nWould you like to start now?";
    }

    return "I'd love to help you monetize your software licenses. Could you tell me:\n\n1. What type of licenses you have?\n2. How many licenses?\n3. When they expire?\n\nThis will help me provide the most accurate information.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Chat toggle button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50 ${isOpen ? 'hidden' : ''}`}
        aria-label="Open chat"
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden z-50 flex flex-col border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Bot size={24} />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-1 -right-1"
                  >
                    <Sparkles size={12} className="text-yellow-300" />
                  </motion.div>
                </div>
                <div>
                  <h3 className="font-bold">SoftBot</h3>
                  <p className="text-sm text-white/80">AI License Expert</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user'
                          ? 'bg-gradient-to-br from-primary-100 to-primary-200 dark:from-primary-900/30 dark:to-primary-800/30'
                          : 'bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-900/30 dark:to-secondary-800/30'
                      }`}
                    >
                      {message.type === 'user' ? (
                        <User size={16} className="text-primary-500" />
                      ) : (
                        <Bot size={16} className="text-secondary-500" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                      }`}
                    >
                      <ReactMarkdown className="prose dark:prose-invert max-w-none">
                        {message.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary-100 to-secondary-200 dark:from-secondary-900/30 dark:to-secondary-800/30 flex items-center justify-center">
                    <Bot size={16} className="text-secondary-500" />
                  </div>
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-2xl">
                    <div className="flex space-x-1">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }}
                        className="w-2 h-2 bg-gray-400 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            <div className="p-4 border-t dark:border-gray-700 bg-white dark:bg-gray-900">
              <div className="flex items-end space-x-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about license valuation..."
                  className="flex-1 resize-none rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:text-white"
                  rows={1}
                  style={{ minHeight: '40px', maxHeight: '120px' }}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 rounded-lg bg-gradient-to-r from-primary-500 to-secondary-500 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <Send size={20} />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;