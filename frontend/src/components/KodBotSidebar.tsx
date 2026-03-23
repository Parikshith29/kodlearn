"use client";
import { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';
import { Send, Bot, User, Sparkles, Loader2, Maximize2, Minimize2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../lib/api';
import ReactMarkdown from 'react-markdown';

export default function KodBotSidebar() {
  const { user } = useAuthStore();
  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; text: string }[]>([
    { role: 'ai', text: `Greetings, ${user?.name?.split(' ')[0] || 'Engineer'}. I am **KodBot**, powered by *Qwen 2.5-7B Instruct*. I am deeply integrated into KodLearn. How can I assist your development today?` }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(false); // Can toggle between standard sidebar and expanded width
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const pageContext = document.title || 'General LMS Platform';
      const res = await api.post('/chat/ai', { message: userMessage, context: pageContext });
      setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: '⚠️ *Connection to Qwen inference engine failed. Please try again later.*' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ width: 340 }}
      animate={{ width: expanded ? 450 : 340 }}
      className="hidden lg:flex flex-col border-l border-white/5 bg-black/40 backdrop-blur-3xl shrink-0 h-screen sticky top-0"
    >
      {/* Header */}
      <div className="p-5 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <Bot size={22} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white tracking-tight flex items-center gap-1.5">
              KodBot <Sparkles size={12} className="text-yellow-400" />
            </h3>
            <p className="text-[10px] text-gray-500 font-mono tracking-widest uppercase truncate max-w-[120px]">Qwen 2.5-7B</p>
          </div>
        </div>
        <button 
          onClick={() => setExpanded(!expanded)}
          className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 transition-colors border border-white/5"
          title={expanded ? "Collapse Width" : "Expand Width"}
        >
          {expanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
        </button>
      </div>

      {/* Profile Section (Since user requested profile integrated in sidebar) */}
      <div className="p-5 border-b border-white/5 flex items-center gap-4 bg-white/[0.01]">
         <div className="w-12 h-12 rounded-full border border-white/10 bg-black flex items-center justify-center p-1 shrink-0">
           <div className="w-full h-full rounded-full bg-white/5 flex items-center justify-center relative overflow-hidden">
             <User size={20} className="text-white/40" />
           </div>
         </div>
         <div className="overflow-hidden">
           <p className="text-sm font-bold text-white truncate">{user?.name || 'Active User'}</p>
           <p className="text-xs text-gray-500 font-mono truncate">{user?.email}</p>
         </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={i} 
            className={`flex flex-col w-full ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex items-center gap-2 mb-1.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-5 h-5 rounded flex items-center justify-center ${msg.role === 'user' ? 'bg-white/10' : 'bg-blue-600/20 text-blue-400'}`}>
                {msg.role === 'user' ? <User size={12} /> : <Bot size={12} />}
              </div>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                {msg.role === 'user' ? 'You' : 'KodBot'}
              </span>
            </div>
            <div className={`px-4 py-3 rounded-2xl max-w-[95%] min-w-0 text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-tr-sm shadow-lg' 
                : 'bg-white/5 border border-white/10 text-gray-200 rounded-tl-sm w-full shadow-md'
            }`}>
              <div className="prose prose-invert prose-sm max-w-none prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/10 prose-pre:overflow-x-auto prose-pre:custom-scrollbar break-words">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-start">
             <div className="flex items-center gap-2 mb-1.5">
              <div className="w-5 h-5 rounded flex items-center justify-center bg-blue-600/20 text-blue-400">
                <Bot size={12} />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">KodBot Thinking...</span>
            </div>
            <div className="px-5 py-3.5 bg-white/5 border border-white/10 rounded-2xl rounded-tl-sm flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
            </div>
          </motion.div>
        )}
      </div>

      {/* Input Box */}
      <div className="p-4 border-t border-white/5 bg-black/50">
        <form onSubmit={handleSend} className="relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your code..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50 transition-colors shadow-inner"
            disabled={loading}
          />
          <button 
            type="submit" 
            disabled={!input.trim() || loading}
            className="absolute right-2 top-2 bottom-2 aspect-square rounded-lg bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/30 flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? <Loader2 size={16} className="text-blue-400 animate-spin" /> : <Send size={16} className="text-blue-400 group-hover:text-white transition-colors group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
          </button>
        </form>
        <p className="text-center text-[9px] text-gray-600 mt-3 font-mono">
          AI generated responses are not guaranteed to be exact.
        </p>
      </div>

    </motion.div>
  );
}
