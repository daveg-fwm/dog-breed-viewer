import { defineConfig } from "vite";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import svgrPlugin from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    svgrPlugin(),
    ViteImageOptimizer({
      includePublic: true,
      png: {
        quality: 70,
      },
      jpeg: {
        quality: 70,
      },
      jpg: {
        quality: 70,
      },
    }),
  ],
});
