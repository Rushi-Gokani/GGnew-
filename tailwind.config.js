/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Avgron', 'Inter', 'sans-serif'],
        serif: ['The Season', 'Playfair Display', 'serif'],
      },
      colors: {
        // Global Gourmet Palette
        gg: {
          cream: '#FFFFFF', // Primary Light Background (White)
          navy: '#284D6A',  // Primary Brand Color
          taupe: '#B4ADA2', // Secondary Accent
          slate: '#29343B', // Dark Text / Footer
          mist: '#D7DDDE',  // Light Secondary Background
        },
        // Mapping to generic utility names for ease of use
        primary: {
          50: '#f0f6fa',
          100: '#e0ecf4',
          200: '#c2dbe9',
          300: '#95c0db',
          400: '#619ec8',
          500: '#3d82ac',
          600: '#2d688e',
          700: '#284D6A', // GG Navy
          800: '#25455d',
          900: '#223a4e',
        },
        gold: {
          400: '#d4af37',
          500: '#c5a028',
        }
      }
    },
  },
  plugins: [],
};
