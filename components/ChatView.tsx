import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Mail, ArrowLeft, Phone, Instagram } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateChatResponse } from '../services/geminiService';

export const ChatView: React.FC = () => {
  const [mode, setMode] = useState<'chat' | 'email'>('chat');
  
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'model',
      text: "G'day! Welcome to emotional studios. I'm your virtual concierge. Ask me about packages, pricing, or our studio rules!",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [emailSubject, setEmailSubject] = useState('General Enquiry');
  const [emailBody, setEmailBody] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, mode]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));

      const responseText = await generateChatResponse(history, userMsg.text);

      const botMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, I'm having trouble connecting. Please try emailing us instead.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const recipient = "admin@emotionalstudios.com.au";
  const subject = encodeURIComponent(`[Enquiry] ${emailSubject}`);
  const body = encodeURIComponent(emailBody);
  const mailToLink = `mailto:${recipient}?subject=${subject}&body=${body}`;

  return (
    <div className="flex flex-col h-full bg-zinc-50 dark:bg-[#111111] border border-zinc-200 dark:border-none backdrop-blur-sm max-w-3xl mx-auto rounded-sm overflow-hidden transition-colors duration-300">
      
      <div className="p-6 border-b border-zinc-200 dark:border-none flex justify-between items-center">
        <div>
          <h2 className="text-xl font-serif italic text-black dark:text-white mb-1">
            {mode === 'chat' ? 'Studio Concierge' : 'Contact Us'}
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-500 tracking-wide uppercase">
            {mode === 'chat' ? 'AI Assistant • Instant Reply' : 'Human Support • 24h Response'}
          </p>
        </div>
        
        <button 
          onClick={() => setMode(mode === 'chat' ? 'email' : 'chat')}
          className="text-xs font-bold uppercase tracking-widest border border-zinc-200 dark:border-none px-4 py-2 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors flex items-center gap-2"
        >
          {mode === 'chat' ? (
            <>
              <Mail className="w-3 h-3" /> Contact Human
            </>
          ) : (
            <>
              <Sparkles className="w-3 h-3" /> Ask AI
            </>
          )}
        </button>
      </div>

      {mode === 'chat' && (
        <>
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'model' && (
                  <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 border border-zinc-300 dark:border-none">
                    <span className="font-serif font-bold text-black dark:text-white text-xs">e.</span>
                  </div>
                )}
                
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block px-6 py-4 rounded-2xl text-sm leading-relaxed ${
                     msg.role === 'user'
                     ? 'bg-black text-white dark:bg-white dark:text-black rounded-tr-sm'
                     : 'bg-zinc-100 border border-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:border-none dark:text-zinc-300 rounded-tl-sm'
                  }`}>
                     <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-600 mt-2 block uppercase tracking-wider">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center border border-zinc-300 dark:border-none">
                    <span className="font-serif font-bold text-black dark:text-white text-xs">e.</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-500 text-xs tracking-widest uppercase h-8">
                  <span>Typing</span>
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-zinc-200 dark:border-none bg-white dark:bg-[#111111]">
            <form onSubmit={handleSendMessage} className="flex gap-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about availability, packages..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-b border-zinc-200 dark:border-none text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-600 px-2 py-3 focus:outline-none focus:border-black dark:focus:border-white transition-colors font-light"
              />
              <button
                type="submit"
                disabled={isLoading || !inputText.trim()}
                className="text-black dark:text-white hover:text-zinc-600 dark:hover:text-zinc-300 disabled:opacity-30 transition-colors px-4"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </>
      )}

      {mode === 'email' && (
        <div className="flex-1 p-8 overflow-y-auto animate-fade-in">
          <div className="max-w-xl mx-auto space-y-12">
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <a href="tel:+61370751000" className="flex flex-col items-center gap-2 p-4 border border-zinc-100 dark:border-none bg-white dark:bg-zinc-900 hover:border-black dark:hover:bg-zinc-800 transition-colors group text-center">
                <Phone className="w-5 h-5 text-zinc-400 group-hover:text-black dark:group-hover:text-white" />
                <span className="text-[10px] font-bold uppercase text-zinc-500 group-hover:text-black dark:group-hover:text-white">Call Us</span>
              </a>
              <a href="https://www.instagram.com/emotional_studios" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 border border-zinc-100 dark:border-none bg-white dark:bg-zinc-900 hover:border-black dark:hover:bg-zinc-800 transition-colors group text-center">
                <Instagram className="w-5 h-5 text-zinc-400 group-hover:text-black dark:group-hover:text-white" />
                <span className="text-[10px] font-bold uppercase text-zinc-500 group-hover:text-black dark:group-hover:text-white">Instagram</span>
              </a>
              <a href="https://www.xiaohongshu.com/user/profile/61667cf2000000000201bbb1?xsec_token=ABty5-U0GFkHoXWTNHOnT_50Oaik1J4-CIMOOYUL6Bqtg=&xsec_source=pc_search" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 border border-zinc-100 dark:border-none bg-white dark:bg-zinc-900 hover:border-black dark:hover:bg-zinc-800 transition-colors group text-center">
                <img 
                  src="https://raw.githubusercontent.com/angeleo1/google-images/main/xiaohongshu.png?v=1" 
                  alt="Xiaohongshu" 
                  className="w-5 h-5 object-contain transition-all opacity-60 group-hover:opacity-100 dark:invert" 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.innerHTML = '<span style="font-size:10px; font-weight:bold;">RED</span>';
                  }}
                />
                <span className="text-[10px] font-bold uppercase text-zinc-500 group-hover:text-black dark:group-hover:text-white">Xiaohongshu</span>
              </a>
              <a href="mailto:admin@emotionalstudios.com.au" className="flex flex-col items-center gap-2 p-4 border border-zinc-100 dark:border-none bg-white dark:bg-zinc-900 hover:border-black dark:hover:bg-zinc-800 transition-colors group text-center">
                <Mail className="w-5 h-5 text-zinc-400 group-hover:text-black dark:group-hover:text-white" />
                <span className="text-[10px] font-bold uppercase text-zinc-500 group-hover:text-black dark:group-hover:text-white">Email</span>
              </a>
            </div>

            <div className="border-t border-zinc-200 dark:border-none pt-8 space-y-2 text-center">
               <h3 className="text-lg font-serif italic text-black dark:text-white">Send a message</h3>
               <p className="text-sm text-zinc-500 font-light">
                 We typically respond within 24 hours. Your message will open in your default email app.
               </p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-zinc-500">Subject</label>
                  <select 
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-none p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors text-black dark:text-white"
                  >
                    <option>General Enquiry</option>
                    <option>Large Group Booking</option>
                    <option>Reschedule / Cancel</option>
                    <option>Partnership</option>
                  </select>
               </div>

               <div>
                  <label className="block text-xs font-bold uppercase tracking-widest mb-2 text-zinc-500">Message</label>
                  <textarea 
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    required
                    placeholder="Hi emotional studios, I have a question about..."
                    rows={6}
                    className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-none p-3 text-sm focus:border-black dark:focus:border-white outline-none transition-colors resize-none text-black dark:text-white"
                  />
               </div>

               <a 
                href={mailToLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-black text-white dark:bg-white dark:text-black py-4 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity"
               >
                 Send Email via App
               </a>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

