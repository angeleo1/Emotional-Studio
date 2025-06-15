import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const Booking: NextPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: null as Date | null,
    time: '',
    shootingType: '',
    colorOption: false,
    otherGoods: {
      a4print: false,
      a4frame: false,
      digital: false,
      calendar: false
    },
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (date: Date | null) => {
    setFormData(prev => ({
      ...prev,
      date: date
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (name === 'colorOption') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        otherGoods: {
          ...prev.otherGoods,
          [name]: checked
        }
      }));
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a]">
      <main className="relative z-10 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto p-12 shadow-2xl shadow-[#ff6100]/5 hover:shadow-[#ff6100]/10 transition-all duration-500">
            <h2 className="text-4xl font-rock-salt text-[#2c1711] mb-12 opacity-90">Book Your Session</h2>
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shooting Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="shootingType" className="block text-xl font-medium text-[#2c1711] mb-3">
                    Shooting Type
                  </label>
                  <select
                    id="shootingType"
                    name="shootingType"
                    value={formData.shootingType}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/50 border-0 focus:ring-2 ring-[#ff6100]/20 outline-none text-[#2c1711] text-lg font-medium transition-all duration-300"
                  >
                    <option value="">Select shooting type</option>
                    <option value="solo">Solo : $55</option>
                    <option value="couple">Couple : $98</option>
                    <option value="triple">Triple : $150</option>
                    <option value="more">or More (Please contact us)</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-xl font-medium text-[#2c1711] mb-3">
                    Preferred Date
                  </label>
                  <DatePicker
                    selected={formData.date}
                    onChange={handleDateChange}
                    dateFormat="MMMM d, yyyy"
                    minDate={new Date()}
                    className="w-full px-6 py-4 rounded-2xl bg-white/50 border-0 focus:ring-2 ring-[#ff6100]/20 outline-none text-[#2c1711] text-lg font-medium transition-all duration-300"
                    placeholderText="Select date"
                    required
                  />
                </div>
              </div>

              {/* Color Option */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="colorOption"
                  name="colorOption"
                  checked={formData.colorOption}
                  onChange={handleCheckboxChange}
                  className="w-5 h-5 rounded border-gray-300 text-[#ff6100] focus:ring-[#ff6100]/20"
                />
                <label htmlFor="colorOption" className="text-xl font-medium text-[#2c1711]">
                  Color Option (Additional Fee: $10)
                </label>
              </div>

              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label htmlFor="name" className="block text-xl font-medium text-[#2c1711] mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/50 border-0 focus:ring-2 ring-[#ff6100]/20 outline-none text-[#2c1711] text-lg font-medium transition-all duration-300 placeholder-[#2c1711]/30"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-xl font-medium text-[#2c1711] mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/50 border-0 focus:ring-2 ring-[#ff6100]/20 outline-none text-[#2c1711] text-lg font-medium transition-all duration-300 placeholder-[#2c1711]/30"
                    placeholder="Your email"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xl font-medium text-[#2c1711] mb-3">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/50 border-0 focus:ring-2 ring-[#ff6100]/20 outline-none text-[#2c1711] text-lg font-medium transition-all duration-300 placeholder-[#2c1711]/30"
                    placeholder="Your phone number"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-xl font-medium text-[#2c1711] mb-3">
                    Preferred Time
                  </label>
                  <select
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 rounded-2xl bg-white/50 border-0 focus:ring-2 ring-[#ff6100]/20 outline-none text-[#2c1711] text-lg font-medium transition-all duration-300"
                  >
                    <option value="">Select time</option>
                    <option value="12:30">12:30 PM</option>
                    <option value="13:00">1:00 PM</option>
                    <option value="13:30">1:30 PM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="14:30">2:30 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="15:30">3:30 PM</option>
                    <option value="16:00">4:00 PM</option>
                    <option value="16:30">4:30 PM</option>
                    <option value="17:00">5:00 PM</option>
                    <option value="17:30">5:30 PM</option>
                    <option value="18:00">6:00 PM</option>
                    <option value="18:30">6:30 PM</option>
                    <option value="19:00">7:00 PM</option>
                    <option value="19:30">7:30 PM</option>
                    <option value="20:00">8:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Other Goods */}
              <div>
                <label className="block text-xl font-medium text-[#2c1711] mb-3">
                  Other Goods (You can also add after the shoot)
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="a4print"
                      name="a4print"
                      checked={formData.otherGoods.a4print}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 rounded border-gray-300 text-[#ff6100] focus:ring-[#ff6100]/20"
                    />
                    <label htmlFor="a4print" className="text-xl font-medium text-[#2c1711]">
                      A4 Print : $10
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="a4frame"
                      name="a4frame"
                      checked={formData.otherGoods.a4frame}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 rounded border-gray-300 text-[#ff6100] focus:ring-[#ff6100]/20"
                    />
                    <label htmlFor="a4frame" className="text-xl font-medium text-[#2c1711]">
                      A4 Frame : $15
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="digital"
                      name="digital"
                      checked={formData.otherGoods.digital}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 rounded border-gray-300 text-[#ff6100] focus:ring-[#ff6100]/20"
                    />
                    <label htmlFor="digital" className="text-xl font-medium text-[#2c1711]">
                      Original Digital Film : $20
                    </label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="calendar"
                      name="calendar"
                      checked={formData.otherGoods.calendar}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 rounded border-gray-300 text-[#ff6100] focus:ring-[#ff6100]/20"
                    />
                    <label htmlFor="calendar" className="text-xl font-medium text-[#2c1711]">
                      Calendar : $45
                    </label>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <label htmlFor="message" className="block text-xl font-medium text-[#2c1711] mb-3">
                  Additional Information
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-6 py-4 rounded-2xl bg-white/50 border-0 focus:ring-2 ring-[#ff6100]/20 outline-none text-[#2c1711] text-lg font-medium transition-all duration-300 placeholder-[#2c1711]/30 resize-none"
                  placeholder="Tell us more about your event or special requirements"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#ff6100] to-[#ff8500] text-[#fff0c6] py-4 rounded-2xl text-lg font-light tracking-wider uppercase hover:scale-[1.02] hover:shadow-lg hover:shadow-[#ff6100]/20 transition-all duration-300"
              >
                Book Now
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Booking; 