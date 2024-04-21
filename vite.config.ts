import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      components: "/src/components",
      features: "/src/features",
      pages: "/src/pages",
      shared: "/src/shared",
      styles: "/src/styles",
      routes: "/src/routes",
    },
  },
})
