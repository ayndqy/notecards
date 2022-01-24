const sveltePreprocess = require('svelte-preprocess')
const autoprefixer = require('autoprefixer')
const development = process.argv.includes('--dev')

module.exports = {
  compilerOptions: {
    dev: development,
    css: false,
  },

  preprocess: sveltePreprocess({
    sourceMap: development,
    postcss: {
      plugins: [autoprefixer()],
    },
  }),
}
