import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// `base: "./"` makes all asset paths relative, so the site works on
// GitHub Pages regardless of the repository name. No changes needed here
// when deploying.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
