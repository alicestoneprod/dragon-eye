import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      components: "/src/components",
      features: "/src/features",
      pages: "/src/pages",
      shared: "/src/shared",
      styles: "/src/styles",
      routes: "/src/routes",
      icons: "/src/icons",
      store: "/src/store",
      providers: "/src/providers",
    },
  },
})
