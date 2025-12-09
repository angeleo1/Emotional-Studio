import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Mail, Phone, Instagram } from 'lucide-react';
import { ChatMessage } from '../types';
import { generateChatResponse } from '../services/geminiService';

interface ChatViewProps {
  isDark?: boolean;
}

export const ChatView: React.FC<ChatViewProps> = ({ isDark = false }) => {
  const [mode, setMode] = useState<'chat' | 'email'>('chat');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: "G'day! Welcome to emotional studios. I'm your virtual concierge. Ask me about packages, pricing, or our studio rules!", timestamp: new Date() }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [emailSubject, setEmailSubject] = useState('General Enquiry');
  const [emailBody, setEmailBody] = useState('');

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => { scrollToBottom(); }, [messages, mode]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', text: inputText, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);
    try {
      const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      const responseText = await generateChatResponse(history, userMsg.text);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: responseText, timestamp: new Date() }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: "Sorry, I'm having trouble connecting. Please try emailing us instead.", timestamp: new Date() }]);
    } finally { setIsLoading(false); }
  };

  const mailToLink = `mailto:admin@emotionalstudios.com.au?subject=${encodeURIComponent(`[Enquiry] ${emailSubject}`)}&body=${encodeURIComponent(emailBody)}`;

  return (
    <div className={`flex flex-col h-full border backdrop-blur-sm max-w-3xl mx-auto rounded-sm overflow-hidden transition-all duration-1000 ${isDark ? 'bg-black border-zinc-800' : 'bg-zinc-50 border-zinc-200'}`}>
      <div className={`p-6 border-b flex justify-between items-center ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
        <div>
          <h2 className={`text-xl font-serif italic mb-1 ${isDark ? 'text-white' : 'text-black'}`}>{mode === 'chat' ? 'Studio Concierge' : 'Contact Us'}</h2>
          <p className={`text-xs tracking-wide uppercase ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>{mode === 'chat' ? 'AI Assistant • Instant Reply' : 'Human Support • 24h Response'}</p>
        </div>
        <button onClick={() => setMode(mode === 'chat' ? 'email' : 'chat')} className={`text-xs font-bold uppercase tracking-widest px-4 py-2 flex items-center gap-2 transition-colors ${isDark ? 'border border-zinc-700 hover:bg-white hover:text-black' : 'border border-zinc-200 hover:bg-black hover:text-white'}`}>
          {mode === 'chat' ? <><Mail className="w-3 h-3" /> Contact Human</> : <><Sparkles className="w-3 h-3" /> Ask AI</>}
        </button>
      </div>

      {mode === 'chat' && (
        <>
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'model' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-200 border-zinc-300'}`}>
                    <span className={`font-serif font-bold text-xs ${isDark ? 'text-white' : 'text-black'}`}>e.</span>
                  </div>
                )}
                <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block px-6 py-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' ? (isDark ? 'bg-white text-black rounded-tr-sm' : 'bg-black text-white rounded-tr-sm') : (isDark ? 'bg-zinc-900 text-zinc-300 rounded-tl-sm' : 'bg-zinc-100 border border-zinc-200 text-zinc-800 rounded-tl-sm')
                  }`}>
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <span className={`text-[10px] mt-2 block uppercase tracking-wider ${isDark ? 'text-zinc-600' : 'text-zinc-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center border ${isDark ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-200 border-zinc-300'}`}>
                  <span className={`font-serif font-bold text-xs ${isDark ? 'text-white' : 'text-black'}`}>e.</span>
                </div>
                <div className={`flex items-center gap-2 text-xs tracking-widest uppercase h-8 ${isDark ? 'text-zinc-500' : 'text-zinc-400'}`}>
                  <span>Typing</span><span className="animate-bounce">.</span><span className="animate-bounce delay-100">.</span><span className="animate-bounce delay-200">.</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className={`p-4 border-t ${isDark ? 'border-zinc-800 bg-black' : 'border-zinc-200 bg-white'}`}>
            <form onSubmit={handleSendMessage} className="flex gap-4">
              <input type="text" value={inputText} onChange={(e) => setInputText(e.target.value)} placeholder="Ask about availability, packages..." disabled={isLoading}
                className={`flex-1 bg-transparent border-b px-2 py-3 focus:outline-none transition-colors font-light ${isDark ? 'border-zinc-700 text-white placeholder-zinc-600 focus:border-white' : 'border-zinc-200 text-black placeholder-zinc-400 focus:border-black'}`}
              />
              <button type="submit" disabled={isLoading || !inputText.trim()} className={`hover:opacity-60 disabled:opacity-30 transition-colors px-4 ${isDark ? 'text-white' : 'text-black'}`}>
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
              {[
                { href: "tel:+61370751000", icon: Phone, label: "Call Us" },
                { href: "https://www.instagram.com/emotional_studios", icon: Instagram, label: "Instagram" },
                { href: "https://www.xiaohongshu.com/user/profile/61667cf2000000000201bbb1", icon: null, label: "Xiaohongshu", isXhs: true },
                { href: "mailto:admin@emotionalstudios.com.au", icon: Mail, label: "Email" }
              ].map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className={`flex flex-col items-center gap-2 p-4 border transition-colors group text-center ${isDark ? 'border-zinc-800 bg-zinc-900 hover:bg-zinc-800' : 'border-zinc-100 bg-white hover:border-black'}`}>
                  {item.isXhs ? (
                    <img src="https://raw.githubusercontent.com/angeleo1/google-images/main/xiaohongshu.png" alt="Xiaohongshu" className={`w-5 h-5 object-contain transition-all opacity-60 group-hover:opacity-100 ${isDark ? 'invert' : ''}`} />
                  ) : item.icon && <item.icon className={`w-5 h-5 ${isDark ? 'text-zinc-500 group-hover:text-white' : 'text-zinc-400 group-hover:text-black'}`} />}
                  <span className={`text-[10px] font-bold uppercase ${isDark ? 'text-zinc-500 group-hover:text-white' : 'text-zinc-500 group-hover:text-black'}`}>{item.label}</span>
                </a>
              ))}
            </div>

            <div className={`border-t pt-8 space-y-2 text-center ${isDark ? 'border-zinc-800' : 'border-zinc-200'}`}>
              <h3 className={`text-lg font-serif italic ${isDark ? 'text-white' : 'text-black'}`}>Send a message</h3>
              <p className={`text-sm font-light ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>We typically respond within 24 hours.</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>Subject</label>
                <select value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} className={`w-full border p-3 text-sm outline-none transition-colors ${isDark ? 'bg-zinc-900 border-zinc-800 text-white focus:border-white' : 'bg-zinc-50 border-zinc-200 text-black focus:border-black'}`}>
                  <option>General Enquiry</option><option>Large Group Booking</option><option>Reschedule / Cancel</option><option>Partnership</option>
                </select>
              </div>
              <div>
                <label className={`block text-xs font-bold uppercase tracking-widest mb-2 ${isDark ? 'text-zinc-500' : 'text-zinc-500'}`}>Message</label>
                <textarea value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder="Hi emotional studios, I have a question about..." rows={6}
                  className={`w-full border p-3 text-sm outline-none transition-colors resize-none ${isDark ? 'bg-zinc-900 border-zinc-800 text-white focus:border-white' : 'bg-zinc-50 border-zinc-200 text-black focus:border-black'}`}
                />
              </div>
              <a href={mailToLink} target="_blank" rel="noopener noreferrer" className={`block w-full text-center py-4 text-xs font-bold uppercase tracking-widest hover:opacity-80 transition-opacity ${isDark ? 'bg-white text-black' : 'bg-black text-white'}`}>
                Send Email via App
              </a>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
