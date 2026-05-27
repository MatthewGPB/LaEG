/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}'],
  theme: {
    extend: {
      colors: {
        // La Esquina brand palette
        navy: {
          DEFAULT: '#1e3a5f',
          50: '#f0f5fb',
          100: '#dbe7f3',
          200: '#b8cfe7',
          300: '#85aed4',
          400: '#5089bd',
          500: '#3a6ea5',
          600: '#2d5285',
          700: '#1e3a5f', // brand primary
          800: '#19314f',
          900: '#152a44',
        },
        cream: {
          DEFAULT: '#fdf8f0',
          50: '#fffdf9',
          100: '#fdf8f0',
          200: '#f8edd5',
        },
        spice: {
          DEFAULT: '#c5532a', // terracotta accent
          dark: '#9f4421',
        },
        marigold: {
          DEFAULT: '#e8a52a',
          dark: '#c18a1f',
        },
        price: '#c0392b', // menu price red
        ink: '#1f2937',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1240px',
      },
      boxShadow: {
        soft: '0 6px 20px rgba(0,0,0,0.08)',
        card: '0 8px 24px rgba(0,0,0,0.10)',
        deep: '0 12px 30px rgba(30,58,95,0.20)',
      },
      backgroundImage: {
        'navy-radial': 'radial-gradient(circle at 30% 20%, #2d5285 0%, #1e3a5f 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
