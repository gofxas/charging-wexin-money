import { defineConfig } from "vite";
import fs from "fs";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    https: {
      key: fs.readFileSync("./server.key"),
      cert: fs.readFileSync("./server.cert"),
    },
  },
  plugins: [react()],
});
