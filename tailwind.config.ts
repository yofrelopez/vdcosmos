import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmos: {
          // Colores principales del logo COSMOS
          blue: '#1a237e',        // Azul corporativo principal
          planet: '#3f51b5',      // Azul del planeta superior
          gradient: '#1565c0',    // Azul degradado inferior
          red: '#ff3d00',         // Rojo/naranja del anillo y letra C
          
          // Variaciones para UI
          'blue-light': '#3949ab',
          'blue-dark': '#0d1451',
          'red-light': '#ff6333',
          'red-dark': '#cc3100',
          
          // Neutros para la web
          gray: {
            900: '#263238',
            700: '#546e7a',
            500: '#90a4ae',
            300: '#b0bec5',
            100: '#eceff1',
            50: '#f5f5f5',
          }
        },
        
        // Alias para uso fácil
        primary: '#1a237e',      // cosmos-blue
        secondary: '#ff3d00',    // cosmos-red
        accent: '#3f51b5',       // cosmos-planet
      },
      
      fontFamily: {
        sans: ['var(--font-opensans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-montserrat)', 'system-ui', 'sans-serif'],
      },
      
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config