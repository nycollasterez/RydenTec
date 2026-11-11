/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ryden: {
          navy: '#07111F',
          midnight: '#0B1730',
          electric: '#087CFF',
          cyan: '#00D5FF',
          white: '#FFFFFF',
          gray: '#A8B5C7',
          card: '#101F35',
          cardBorder: 'rgba(8, 124, 255, 0.16)',
          cardHover: '#132540',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      backgroundImage: {
        'electric-gradient': 'linear-gradient(135deg, #087CFF 0%, #00D5FF 100%)',
        'electric-gradient-subtle': 'linear-gradient(135deg, rgba(8, 124, 255, 0.15) 0%, rgba(0, 213, 255, 0.08) 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(16, 31, 53, 0.8) 0%, rgba(11, 23, 48, 0.95) 100%)',
        'radial-glow': 'radial-gradient(circle at 50% 0%, rgba(8, 124, 255, 0.18) 0%, transparent 70%)',
      },
      boxShadow: {
        'electric': '0 0 25px -5px rgba(8, 124, 255, 0.4)',
        'electric-lg': '0 0 50px -10px rgba(8, 124, 255, 0.5), 0 0 30px -5px rgba(0, 213, 255, 0.3)',
        'card': '0 8px 30px rgba(0, 0, 0, 0.45)',
        'card-hover': '0 15px 40px rgba(8, 124, 255, 0.22), 0 8px 20px rgba(0, 0, 0, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 7s ease-in-out 2s infinite',
        'float-reverse': 'floatReverse 8s ease-in-out 1s infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
