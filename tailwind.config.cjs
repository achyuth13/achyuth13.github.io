// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.svelte',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#102820',
        'primary-shade': '#4C6444',
        secondary: '#CABA9C',
        'secondary-shade': '#8A6240',
        footer: '#4D2D18',
        text: "#FFFFFF"
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}
