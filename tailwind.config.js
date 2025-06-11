/** @type {import(\'tailwindcss\').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        dark: {
          900: '#1a1a1a',
          800: '#2a2a2a',
          700: '#3a3a3a',
        }
      },
    },
  },
  plugins: [
    require(\'@tailwindcss/forms\'),
  ],
}

