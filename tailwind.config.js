/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.css",
  ],
  theme: {
    extend: {
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },
      colors: {
        'text-color': '#fff',
        'main-blue': '#032234',
        'gray-bkg': '#f3f4f6',
        'other-blue': '#0d4e78',
        'hover-blue': '#256086',
        
        
      },
      boxShadow: {
        'blue': '0 0 10px rgba(142, 219, 245, 0.966)',
      },
    },
  },
  plugins: [],
};

