import { resolve } from "path";
import { UserConfig } from "vite";
import Checker from "vite-plugin-checker";
import { Mode as mdMode, plugin as mdPlugin } from "vite-plugin-markdown";
import svgr from "vite-plugin-svgr";

const shouldAnalyze = process.env.ANALYZE;

const config: UserConfig = {
  resolve: {
    alias: {
      src: resolve(__dirname, "./src"),
    },
  },
  build: {
    assetsDir: "static",
    rollupOptions: {},
    sourcemap: !!shouldAnalyze,
  },
  optimizeDeps: {
    include: [
      "@emotion/react",
      "@emotion/styled",
      "@mui/material/Tooltip",
      "@mui/material/Unstable_Grid2",
    ],
  },
  esbuild: {
    jsxFactory: `jsx`,
    // jsxInject: `import { jsx } from '@emotion/react'`,
  },
  plugins: [
    svgr(),
    mdPlugin({ mode: [mdMode.MARKDOWN] }),
    Checker({
      typescript: true,
      overlay: true,
    }),
  ],
  server: {
    host: "127.0.0.1",
    port: 4000,
    proxy: {
      "^/api/.*": {
        target: "http://127.0.0.1:8090",
        changeOrigin: true,
        ws: true,
        secure: false,
      },
    },
  },
};

export default config;
