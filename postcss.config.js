import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindConfig from './src/styles/css/tailwind.config.cjs'

export default {
  plugins: [tailwind(tailwindConfig), autoprefixer],
}