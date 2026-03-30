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
        github: {
          dark: 'var(--bg-primary)',
          header: 'var(--bg-header)',
          border: 'var(--border)',
          text: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          link: 'var(--link)',
          green: {
            DEFAULT: '#238636',
            hover: '#2ea043',
          },
          square: {
            0: '#161b22',
            1: '#0e4429',
            2: '#006d32',
            3: '#26a641',
            4: '#39d353',
          }
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        mono: ['"SFMono-Regular"', 'Consolas', '"Liberation Mono"', 'Menlo', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-150%) skewX(12deg)' },
          '100%': { transform: 'translateX(250%) skewX(12deg)' },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}
