import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    cssTarget: ["safari14", "chrome87", "firefox78", "edge88"],
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "index.html"),
        tgpostCase: path.resolve(__dirname, "tgpost-case.html"),
        litteCase: path.resolve(__dirname, "litte-case.html"),
        myvmsCase: path.resolve(__dirname, "myvms-case.html"),
        suvvyCase: path.resolve(__dirname, "suvvy-case.html"),
        allocaCase: path.resolve(__dirname, "alloca-case.html"),
        rmgroupCase: path.resolve(__dirname, "rmgroup-case.html"),
      },
    },
  },
});
