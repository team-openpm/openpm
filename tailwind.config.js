const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  experimental: {
    optimizeUniversalDefaults: true,
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    fontSize: {
      '2xs': ['0.75rem', {lineHeight: '1.25rem'}],
      xs: ['0.8125rem', {lineHeight: '1.5rem'}],
      sm: ['0.875rem', {lineHeight: '1.5rem'}],
      base: ['1rem', {lineHeight: '1.75rem'}],
      lg: ['1.125rem', {lineHeight: '1.75rem'}],
      xl: ['1.25rem', {lineHeight: '1.75rem'}],
      '2xl': ['1.5rem', {lineHeight: '2rem'}],
      '3xl': ['1.875rem', {lineHeight: '2.25rem'}],
      '4xl': ['2.25rem', {lineHeight: '2.5rem'}],
      '5xl': ['3rem', {lineHeight: '1'}],
      '6xl': ['3.75rem', {lineHeight: '1'}],
      '7xl': ['4.5rem', {lineHeight: '1'}],
      '8xl': ['6rem', {lineHeight: '1'}],
      '9xl': ['8rem', {lineHeight: '1'}],
    },

    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },

      opacity: {
        1: '0.01',
        2.5: '0.025',
        3: '0.03',
        4: '0.04',
        7.5: '0.075',
        15: '0.15',
      },

      boxShadow: {
        'inner-white': 'inset 0px 1px 0px rgba(255, 255, 255, 0.1)',

        input: `
        0px 1px 0px -1px var(--tw-shadow-color),
        0px 1px 1px -1px var(--tw-shadow-color),
        0px 1px 2px -1px var(--tw-shadow-color),
        0px 2px 4px -2px var(--tw-shadow-color),
        0px 3px 6px -3px var(--tw-shadow-color)
      `,
        highlight: `
        inset 0px 0px 0px 1px var(--tw-shadow-color),
        inset 0px 1px 0px var(--tw-shadow-color)
      `,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // ...
  ],
}
