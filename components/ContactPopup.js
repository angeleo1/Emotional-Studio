import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function ContactPopup({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('chat')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // 여기에 폼 제출 로직 추가
    console.log('Form submitted:', { message, email })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative w-full max-w-2xl bg-white/90 dark:bg-[#2c1711]/90 backdrop-blur-xl rounded-2xl border border-black/5 dark:border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors duration-200"
            >
              <span className="text-2xl text-[#2c1711] dark:text-white">×</span>
            </button>

            {/* Header */}
            <div className="p-6 border-b border-black/5 dark:border-white/5">
              <h2 className="text-3xl font-bold text-[#2c1711] dark:text-white font-rock-salt">
                Get in Touch
              </h2>
              <p className="text-[#2c1711]/80 dark:text-white/80 mt-2 font-noto-sans">
                We're here to help you with any questions or concerns
              </p>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-black/5 dark:border-white/5">
              <button
                onClick={() => setActiveTab('chat')}
                className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${
                  activeTab === 'chat'
                    ? 'text-[#ff6100] border-b-2 border-[#ff6100]'
                    : 'text-[#2c1711]/60 dark:text-white/60 hover:text-[#2c1711] dark:hover:text-white'
                } font-noto-sans`}
              >
                Live Chat
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`flex-1 py-4 text-center font-medium transition-colors duration-200 ${
                  activeTab === 'email'
                    ? 'text-[#ff6100] border-b-2 border-[#ff6100]'
                    : 'text-[#2c1711]/60 dark:text-white/60 hover:text-[#2c1711] dark:hover:text-white'
                } font-noto-sans`}
              >
                Email Us
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === 'chat' ? (
                <div className="space-y-4">
                  <div className="h-96 overflow-y-auto p-4 bg-black/5 dark:bg-white/5 rounded-xl">
                    {/* Chat messages will go here */}
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 rounded-full bg-[#ff6100] flex items-center justify-center text-white">
                          E
                        </div>
                        <div className="flex-1 bg-white dark:bg-[#1a0f0a] rounded-xl p-3 shadow-sm">
                          <p className="text-[#2c1711] dark:text-white font-noto-sans">
                            Hello! How can we help you today?
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 rounded-xl bg-white/50 dark:bg-[#1a0f0a]/50 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-[#ff6100] focus:border-transparent transition-all duration-200 font-noto-sans"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-[#ff6100] text-white rounded-xl font-medium hover:bg-[#ff6100]/90 transition-colors duration-200 font-noto-sans"
                    >
                      Send
                    </motion.button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[#2c1711] dark:text-white mb-2 font-noto-sans">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-[#1a0f0a]/50 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-[#ff6100] focus:border-transparent transition-all duration-200 font-noto-sans"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-[#2c1711] dark:text-white mb-2 font-noto-sans">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-[#1a0f0a]/50 border border-black/10 dark:border-white/10 focus:ring-2 focus:ring-[#ff6100] focus:border-transparent transition-all duration-200 font-noto-sans resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full px-8 py-4 bg-[#ff6100] text-white rounded-xl font-medium hover:bg-[#ff6100]/90 transition-colors duration-200 font-noto-sans"
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 