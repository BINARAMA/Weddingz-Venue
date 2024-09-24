/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      keyframes: {
        gradient: {
          '0%': {
            background: 'linear-gradient(45deg, #FAFAFA, #D6D6D6)',
          },
          '50%': {
            background: 'linear-gradient(45deg, #FAFAFA, #D6D6D6)',
          },
          '100%': {
            background: 'linear-gradient(45deg, #D6D6D6, #FAFAFA)',
          },
        },
      },
      animation: {
        gradient: 'gradient 15s ease infinite',
      },
    },
  },
  plugins: [],
};
