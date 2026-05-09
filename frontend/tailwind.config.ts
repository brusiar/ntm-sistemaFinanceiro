import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Laranja-vermelho NTM — cor primária oficial do site
        primary: {
          50:  '#fff4f1',
          100: '#ffe4dc',
          200: '#ffcabc',
          300: '#ffa48e',
          400: '#ff7355',
          500: '#F25C3B',  // cor exata do site
          600: '#e04826',
          700: '#bc3519',
          800: '#9a2e18',
          900: '#7f2b1a',
        },
        // Azul escuro NTM — fundo do footer e seções escuras
        navy: {
          50:  '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#2d3f55',
          900: '#233045',  // cor exata do site
          950: '#1a2535',
        },
        // Texto escuro NTM
        ink: {
          DEFAULT: '#0d141a',
          light:   '#56585e',
          muted:   '#8a8c96',
        },
        sidebar: {
          bg:         '#233045',
          hover:      '#2d3f55',
          active:     '#F25C3B',
          activeBg:   '#2a1f1a',
          border:     '#2d3f55',
          text:       '#8ba3bc',
          textActive: '#ffffff',
        },
      },
      fontFamily: {
        sans:    ['Poppins', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card':      '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'card-hover':'0 4px 12px 0 rgba(0,0,0,0.10), 0 2px 4px -1px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
}

export default config
