import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: 'public', 
  build: {
    outDir: '../dist', 
    emptyOutDir: true,
    rollupOptions: {
      
      input: {
        index: resolve(__dirname, 'public/index.html'),
        book: resolve(__dirname, 'public/book.html'),
        club: resolve(__dirname, 'public/club.html'),
      },
      output: {
        
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
  server: {
    port: 3000,
  },
})
