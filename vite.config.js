import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    minify: true,
    lib: {
      entry: path.resolve(__dirname, "src/main.js"),
      name: "DialogActions",
      fileName: () => 'pc-dialog.js',
      formats: ['umd']
    },
    rollupOptions: {
      output: {
        assetFileNames: "pc-dialog.[ext]",
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});

