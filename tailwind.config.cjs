// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.svelte',
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      backgroundImage: {
        'large': "url('/meyoga.jpeg')",
        'small': "url('/tree.jpeg')",
      },
      colors: {
        primary: '#112A46',
        'primary-shade': '#4C6444',
        secondary: '#112A46',
        'secondary-shade': '#ACC8E5',
        footer: '#4D2D18',
        text: "#FFFFFF"
      },
    },
    fontFamily: {
      "dk-serif": ['Poppins', 'serif'],
      serif: 'serif'
    }
  },
  plugins: [
    require('daisyui'),
  ],
}
