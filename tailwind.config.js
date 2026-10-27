/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F7EFE3',
        ivory: '#FDF9F2',
        linen: '#F1E3D0',
        sand: '#E6D3BB',
        dune: '#D8BFA0',
        caramel: {
          DEFAULT: '#B67845',
          light: '#D5A16A',
          dark: '#8B532C',
        },
        copper: '#C98B55',
        bark: '#4B2F1F',
        espresso: '#2A1A10',
        ink: '#251810',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'Tahoma', 'Arial', 'sans-serif'],
        display: ['Alexandria', '"IBM Plex Sans Arabic"', 'Tahoma', 'sans-serif'],
        latin: ['"Space Grotesk"', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 30px 70px -35px rgba(61, 37, 20, 0.45)',
        card: '0 18px 45px -28px rgba(61, 37, 20, 0.4)',
        inset: 'inset 0 1px 0 rgba(255, 250, 240, 0.6)',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.75rem',
      },
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        marquee: 'marquee 36s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'spin-slow': 'spin-slow 40s linear infinite',
        shimmer: 'shimmer 8s linear infinite',
        'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
