import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

// const proxyConfig = {
//     target: "http://backend:8000",
//     changeOrigin: true,
// };

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  root: 'src',
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  worker: {
    format: 'es',
    plugins: [tsconfigPaths()],
  },
  plugins: [tsconfigPaths()],
  // css: {
  //     modules: {
  //         localsConvention: "camelCaseOnly",
  //     },
  // },
  // server: {
  //     proxy: {
  //         "/api": proxyConfig,
  //         "/auth": proxyConfig,
  //     },
  // },
})
