/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'custom-bg': '#F0F0E9', // custom couleurs background
        'custom-dark': '#121719',
        'custom-third-color': '#805a46',
      },
    
      fontFamily: {
        sans: ['Josefin Sans', 'sans-serif'], // Police principale pour le texte sans serif
        slab: ['Josefin Slab', 'serif'],      // Police principale pour le texte serif
      },
    },
  },
  plugins: [],
};

