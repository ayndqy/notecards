const esbuild = require('esbuild')
const svelte = require('esbuild-svelte')
const svelteConfig = require('./svelte.config')
const { derver } = require('derver')

const development = process.argv.includes('--dev')
const host = '0.0.0.0'
const port = 3000

esbuild

  // Build
  .build({
    entryPoints: ['src/main.ts'],
    bundle: true,
    outfile: 'public/build/bundle.js',
    mainFields: ['svelte', 'module', 'main'],
    minify: !development,
    incremental: development,
    sourcemap: development,
    plugins: [svelte(svelteConfig)],
  })

  // Development server
  .then((bundle) => {
    development &&
      derver({
        dir: 'public',
        host: host,
        port: port,
        watch: ['public', 'src'],
        onwatch: async (lr, item) => {
          if (item == 'src') {
            lr.prevent()
            bundle.rebuild().catch((err) => lr.error(err.message, 'Svelte compile error'))
          }
        },
      })
  })
