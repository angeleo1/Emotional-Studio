/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'rock-salt': ['RockSalt-Regular', 'cursive'],
        'noto-sans': ['Noto Sans KR', 'sans-serif'],
        rocksalt: ['Rocksalt', 'cursive'],
        'mr-de-haviland': ['Mr De Haviland', 'cursive'],
        'mrs-sheppards': ['Mrs Sheppards', 'cursive'],
        'eagle-lake': ['Eagle Lake', 'cursive'],
        'herr-von': ['Herr Von Muellerhoff', 'cursive'],
        'beau-rivage': ['Beau Rivage', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
        'dm-serif': ['DM Serif Text', 'serif'],
      },
      colors: {
        primary: '#1a1a1a',
        secondary: '#ffffff',
        accent: '#ff6b6b',
      },
      keyframes: {
        slideLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        kenburns: {
          '0%': { transform: 'scale(1) translate(0, 0)' },
          '50%': { transform: 'scale(1.1) translate(-1%, -1%)' },
          '100%': { transform: 'scale(1) translate(0, 0)' },
        },
        'jello-diagonal-2': {
          '0%': { transform: 'skew(0deg, 0deg) translate(0)' },
          '16.667%': { transform: 'skew(12deg, 12deg) translate(0)' },
          '33.333%': { transform: 'skew(-4deg, -4deg) translate(0)' },
          '50%': { transform: 'skew(4deg, 4deg) translate(0)' },
          '66.667%': { transform: 'skew(-2deg, -2deg) translate(0)' },
          '83.333%': { transform: 'skew(2deg, 2deg) translate(0)' },
          '100%': { transform: 'skew(0deg, 0deg) translate(0)' },
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' }
        },
        'slide-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'slide-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'focus-in-expand': {
          '0%': { 
            letterSpacing: '-0.5em',
            filter: 'blur(12px)',
            opacity: '0'
          },
          '100%': {
            letterSpacing: 'normal',
            filter: 'blur(0)',
            opacity: '1'
          }
        },
        'tracking-in': {
          '0%': {
            letterSpacing: '-0.5em',
            opacity: '0'
          },
          '40%': {
            opacity: '0.6'
          },
          '100%': {
            opacity: '1'
          }
        }
      },
      animation: {
        slideLeft: 'slideLeft 30s linear infinite',
        kenburns: 'kenburns 20s ease infinite',
        'jello-diagonal-2': 'jello-diagonal-2 2s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'slow-zoom': 'slow-zoom 15s ease-out forwards',
        'slide-left': 'slide-left 2.5s linear infinite',
        'slide-right': 'slide-right 2.5s linear infinite',
        'focus-in-expand': 'focus-in-expand 1.2s cubic-bezier(0.250, 0.460, 0.450, 0.940) both',
        'tracking-in': 'tracking-in 0.7s cubic-bezier(0.215, 0.610, 0.355, 1.000) both'
      },
    },
  },
  plugins: [],
} 