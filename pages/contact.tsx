import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Navbar from '../components/Navbar';

const Contact: NextPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-[1]">
        <Image
          src="/images/miles-burke-idhx-MOCDSk-unsplash.jpg"
          alt="Background"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      {/* Content Overlay */}
      <div className="fixed inset-0 z-[2] bg-[#fff0c6]/10 backdrop-blur-sm" />

      <Navbar />

      <main className="relative z-10 pt-24 pb-20">
        <Head>
          <title>Contact Us | Emotional Studio</title>
          <meta name="description" content="Get in touch with Emotional Studio" />
        </Head>

        <section className="py-32 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Contact Information */}
              <div className="bg-white/40 dark:bg-[#2c1711]/40 backdrop-blur-xl rounded-3xl p-12 shadow-2xl shadow-[#ff6100]/5 hover:shadow-[#ff6100]/10 transition-all duration-500">
                <h2 className="text-4xl font-rock-salt text-[#2c1711] dark:text-[#fff0c6] mb-12 opacity-90">Get in Touch</h2>
                <div className="space-y-10 mb-10">
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6100]/10 to-[#ff6100]/20 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                      <FaPhone className="text-[#ff6100] text-xl transform group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div>
                      <p className="text-sm text-[#2c1711]/40 dark:text-[#fff0c6]/40 mb-1 tracking-wider uppercase">Phone</p>
                      <p className="text-[#2c1711] dark:text-[#fff0c6] text-lg font-light">+82 10-1234-5678</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6100]/10 to-[#ff6100]/20 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                      <FaEnvelope className="text-[#ff6100] text-xl transform group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div>
                      <p className="text-sm text-[#2c1711]/40 dark:text-[#fff0c6]/40 mb-1 tracking-wider uppercase">Email</p>
                      <p className="text-[#2c1711] dark:text-[#fff0c6] text-lg font-light">info@emotionalstudio.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#ff6100]/10 to-[#ff6100]/20 flex items-center justify-center transform group-hover:scale-110 transition-all duration-300">
                      <FaMapMarkerAlt className="text-[#ff6100] text-xl transform group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <div>
                      <p className="text-sm text-[#2c1711]/40 dark:text-[#fff0c6]/40 mb-1 tracking-wider uppercase">Address</p>
                      <p className="text-[#2c1711] dark:text-[#fff0c6] text-lg font-light">123 Photography St, Seoul</p>
                    </div>
                  </div>
                </div>
                <div className="relative h-48 rounded-2xl overflow-hidden">
                  <Image
                    src="/images/markus-winkler-q3QPw37J6Xs-unsplash.jpg"
                    alt="Contact Decoration"
                    fill
                    className="object-cover object-[center_35%]"
                  />
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white/40 dark:bg-[#2c1711]/40 backdrop-blur-xl rounded-3xl p-12 shadow-2xl shadow-[#ff6100]/5 hover:shadow-[#ff6100]/10 transition-all duration-500">
                <form className="space-y-8">
                  <div>
                    <label htmlFor="name" className="block text-sm text-[#2c1711]/40 dark:text-[#fff0c6]/40 mb-3 tracking-wider uppercase">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-6 py-4 rounded-2xl bg-white/50 dark:bg-[#2c1711]/50 border-0 focus:ring-2 ring-[#ff6100]/20 outline-none text-[#2c1711] dark:text-[#fff0c6] text-lg font-light transition-all duration-300 placeholder-[#2c1711]/30 dark:placeholder-[#fff0c6]/30"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-[#2c1711]/40 dark:text-[#fff0c6]/40 mb-3 tracking-wider uppercase">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-6 py-4 rounded-2xl bg-white/50 dark:bg-[#2c1711]/50 border-0 focus:ring-2 ring-[#ff6100]/20 outline-none text-[#2c1711] dark:text-[#fff0c6] text-lg font-light transition-all duration-300 placeholder-[#2c1711]/30 dark:placeholder-[#fff0c6]/30"
                      placeholder="Your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm text-[#2c1711]/40 dark:text-[#fff0c6]/40 mb-3 tracking-wider uppercase">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={6}
                      className="w-full px-6 py-4 rounded-2xl bg-white/50 dark:bg-[#2c1711]/50 border-0 focus:ring-2 ring-[#ff6100]/20 outline-none text-[#2c1711] dark:text-[#fff0c6] text-lg font-light transition-all duration-300 placeholder-[#2c1711]/30 dark:placeholder-[#fff0c6]/30 resize-none"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#ff6100] to-[#ff8500] text-[#fff0c6] py-4 rounded-2xl text-lg font-light tracking-wider uppercase hover:scale-[1.02] hover:shadow-lg hover:shadow-[#ff6100]/20 transition-all duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact; 