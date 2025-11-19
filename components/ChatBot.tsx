import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User as UserIcon, Loader2 } from 'lucide-react';
import { ChatMessage } from '../types';
import { chatWithGemini } from '../services/geminiService';

interface ChatBotProps {
  isOpenExternal?: boolean;
  onToggleExternal?: (isOpen: boolean) => void;
}

export const ChatBot: React.FC<ChatBotProps> = ({ isOpenExternal, onToggleExternal }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'model', text: 'Hi! I\'m EcoBot. Ask me anything about recycling or our app!', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync internal state with prop if provided
  const isOpen = isOpenExternal !== undefined ? isOpenExternal : internalIsOpen;
  const setIsOpen = onToggleExternal || setInternalIsOpen;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    
    try {
      const responseText = await chatWithGemini(input, history);
      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText || "I'm not sure, try asking differently.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button (Only show if not controlled externally, or always show as a convenience) */}
      {!onToggleExternal && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`fixed bottom-6 right-6 p-4 rounded-full shadow-2xl z-50 transition-all duration-300 hover:scale-110 ${
            isOpen ? 'bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-white rotate-90' : 'bg-releaf-600 text-white'
          }`}
        >
          {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[500px] bg-white dark:bg-[#1F2937] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col z-40 overflow-hidden animate-[float_0.3s_ease-out]">
          
          {/* Header */}
          <div className="bg-releaf-600 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full text-white">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-bold text-white text-lg">EcoBot Assistant</h3>
                <p className="text-releaf-100 text-xs">Powered by Gemini AI</p>
              </div>
            </div>
            {onToggleExternal && (
               <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
                  <X size={20} />
               </button>
            )}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-[#111827]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.role === 'user' ? 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' : 'bg-releaf-100 dark:bg-releaf-900/30 text-releaf-600 dark:text-releaf-400'
                }`}>
                  {msg.role === 'user' ? <UserIcon size={14} /> : <Bot size={14} />}
                </div>
                <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${
                  msg.role === 'user' 
                    ? 'bg-slate-800 dark:bg-white text-white dark:text-slate-900 rounded-tr-none' 
                    : 'bg-white dark:bg-[#1F2937] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-releaf-100 dark:bg-releaf-900/30 text-releaf-600 dark:text-releaf-400 flex items-center justify-center">
                  <Bot size={14} />
                </div>
                <div className="bg-white dark:bg-[#1F2937] p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm">
                  <Loader2 size={16} className="animate-spin text-releaf-500" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSend} className="p-4 bg-white dark:bg-[#1F2937] border-t border-slate-100 dark:border-slate-700">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-100 dark:bg-[#111827] text-slate-900 dark:text-white border-transparent focus:border-releaf-500 focus:ring-0 transition-all outline-none text-sm"
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-releaf-600 hover:bg-releaf-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </form>

        </div>
      )}
    </>
  );
};