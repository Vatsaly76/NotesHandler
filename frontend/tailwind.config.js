/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Dark theme palette
        dark: {
          50:  '#f0f0f5',
          100: '#d6d6e8',
          200: '#a8a8cc',
          300: '#7a7ab0',
          400: '#5c5c99',
          500: '#3e3e80',
          600: '#2d2d66',
          700: '#1e1e4d',
          800: '#13132e',
          900: '#0a0a1a',
          950: '#05050d',
        },
        violet: {
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
        accent: {
          cyan:   '#22d3ee',
          pink:   '#f472b6',
          amber:  '#fbbf24',
          emerald:'#34d399',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh':
          'radial-gradient(at 40% 20%, hsla(265,80%,25%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(220,80%,15%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(265,60%,15%,1) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow-violet': '0 0 20px rgba(139, 92, 246, 0.35)',
        'glow-cyan':   '0 0 20px rgba(34, 211, 238, 0.25)',
        'card':        '0 4px 24px rgba(0,0,0,0.4)',
        'card-hover':  '0 8px 40px rgba(139, 92, 246, 0.3)',
      },
      animation: {
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.35s ease-out',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer':    'shimmer 2s infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(16px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
    },
  },
  plugins: [],
}