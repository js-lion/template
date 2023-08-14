import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    target: "modules",
    lib: {
      entry: "src/template",
      name: "template",
      formats: ["es", "umd"],
      fileName: "template"
    },
    sourcemap: true,
    manifest: false,
    rollupOptions: {
      external: [],
      output: {
        inlineDynamicImports: true
      }
    }
  }
})
