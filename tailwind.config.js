/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#0f0f0f',
        flame: '#8B0000',
        gold: '#D4AF37',
        slate: '#181818',
        ash: '#8a8a8a'
      },
      boxShadow: {
        glow: '0 0 40px rgba(212, 175, 55, 0.16)',
        card: '0 20px 60px rgba(0,0,0,0.35)'
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
