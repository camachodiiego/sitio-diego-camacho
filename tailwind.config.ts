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
        brand: {
          50:  '#f0f4ff',
          100: '#e0eaff',
          500: '#3b5bdb',
          600: '#2f4acb',
          700: '#2340b0',
          900: '#0f1f6e',
        },
        surface: {
          DEFAULT: '#ffffff',
          subtle:  '#f8f9fa',
          muted:   '#f1f3f5',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-cal)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
