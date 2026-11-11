/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        reveste: {
          bg: '#E9E8F8',          // Lavanda Suave (Fundo)
          surface: '#FFFFFF',     // Branco Suave (Cards)
          blue: '#8DB9F0',        // Azul Celeste (Header, Hero, Footer, Destaques)
          peach: '#F5B69E',       // Pêssego Pastel (Badges, Destaques, Sacolinha)
          text: '#1E293B',         // Texto Escuro Legível
          border: '#D8D7EE',      // Lavanda Sutil (Bordas e Linhas)
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(141, 185, 240, 0.15)',
        'card': '0 8px 30px rgba(141, 185, 240, 0.18)',
        'modal': '0 20px 40px -15px rgba(30, 41, 59, 0.25)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}
