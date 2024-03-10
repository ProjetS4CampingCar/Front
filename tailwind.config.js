/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.vue'],
  theme: {
    colors: {
      'primary': '#672F6C',
      'secondary': '#000000',
      'tertiary': '#FFFFFF',
      'buttonColor': '#672F6C',
      'hoverColor': '#523c70',
      'textColor1': '#000000', // Noir
      'textColor2': '#666666', // Gris clair
      'textColor3': '#CCCCCC', // Gris foncé
    }
  },
  plugins: []
}