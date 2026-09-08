/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A01441',
          light: '#C52A5C',
          dark: '#6D0D2E',
        },
        bg: {
          DEFAULT: '#07080C',
          surface: '#11131A',
          'surface-light': '#191C25',
        },
        accent: {
          success: '#39C985',
          warning: '#F5B942',
          danger: '#F15B64',
          info: '#5DA9FF',
        },
      },
      fontFamily: {
        heading: ['Space Grotesk', 'Sora', 'system-ui', 'sans-serif'],
        body: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'typewriter': 'typewriter 3s steps(40) forwards',
        'cursor-blink': 'cursor-blink 1s step-end infinite',
        'slide-up': 'slideUp 0.6s ease-out',
        'fade-in': 'fadeIn 0.8s ease-out',
        'data-flow': 'dataFlow 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(160, 20, 65, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(160, 20, 65, 0.6), 0 0 80px rgba(160, 20, 65, 0.2)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        dataFlow: {
          '0%': { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
