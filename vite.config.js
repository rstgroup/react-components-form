import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pkgJson from "./package.json";

const {
  peerDependencies,
  dependencies,
} = pkgJson;

export default defineConfig({
  build: {
    lib: {
      // eslint-disable-next-line no-undef
      entry: path.resolve(__dirname, "src/index.js"),
      name: "react-components-form",
      fileName: (format) => `index.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys({
        ...peerDependencies,
        ...dependencies,
      }), 'react/jsx-runtime'],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
  plugins: [react()],
})
