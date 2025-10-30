// Design tokens para el sistema de diseño COSMOS
export const cosmosColors = {
  // Colores principales del logo
  primary: '#1a237e',      // Azul corporativo
  secondary: '#ff3d00',    // Rojo/naranja del anillo
  accent: '#3f51b5',       // Azul del planeta
  
  blue: {
    main: '#1a237e',
    light: '#3949ab',
    dark: '#0d1451',
    planet: '#3f51b5',
    gradient: '#1565c0',
  },
  
  red: {
    main: '#ff3d00',
    light: '#ff6333',
    dark: '#cc3100',
  },
  
  gray: {
    900: '#263238',
    700: '#546e7a',
    500: '#90a4ae',
    300: '#b0bec5',
    100: '#eceff1',
    50: '#f5f5f5',
  },
  
  neutral: {
    white: '#ffffff',
    black: '#000000',
  }
} as const

// Tipografías
export const cosmosTypography = {
  fontFamily: {
    display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
    body: ['Inter', 'system-ui', 'sans-serif'],
  },
  
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  }
} as const

// Espaciado
export const cosmosSpacing = {
  xs: '0.5rem',
  sm: '0.75rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
} as const

// Componentes base
export const cosmosComponents = {
  button: {
    sizes: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
    variants: {
      primary: 'bg-cosmos-blue text-white hover:bg-cosmos-blue-light',
      secondary: 'bg-cosmos-red text-white hover:bg-cosmos-red-light',
      outline: 'border-2 border-cosmos-blue text-cosmos-blue hover:bg-cosmos-blue hover:text-white',
    }
  }
} as const