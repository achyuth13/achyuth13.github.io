// postcss.config.js
module.exports = {
    plugins: [
      require('tailwindcss')('./tailwind.config.cjs'),
      require('autoprefixer'),
      // Add more PostCSS plugins as needed
    ]
  }
  