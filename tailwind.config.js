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
        sienna: {
          DEFAULT: '#c2652a',
          hover: '#a85420',
          light: '#f7ebe1',
          darkLight: '#3d2517',
          darkAccent: '#d97736',
        },
        linen: {
          DEFAULT: '#faf5ee',
          card: '#ffffff',
          dim: '#f3ece0',
          // Deep warm dark mode palette
          darkBg: '#120f0d',
          darkCard: '#1c1714',
          darkDim: '#26201b',
          darkHover: '#322923',
        },
        rose: {
          DEFAULT: '#8c3c3c',
          light: '#f6eaea',
          darkLight: '#3b1c1c',
        },
        warm: {
          border: 'rgba(216, 208, 200, 0.6)',
          darkBorder: 'rgba(75, 62, 52, 0.6)',
          dark: '#3a302a',
          muted: '#7a7068',
          darkText: '#ede5dc',
          darkMuted: '#9e9083',
        }
      },
      fontFamily: {
        serif: ['"EB Garamond"', 'serif'],
        sans: ['"Manrope"', 'sans-serif'],
      },
      boxShadow: {
        'sahara': '0 2px 16px rgba(58, 48, 42, 0.04)',
        'sahara-dark': '0 4px 20px rgba(0, 0, 0, 0.5)',
        'sahara-hover': '0 6px 24px rgba(58, 48, 42, 0.08)',
      },
      borderRadius: {
        'sahara': '8px',
      }
    },
  },
  plugins: [],
}
