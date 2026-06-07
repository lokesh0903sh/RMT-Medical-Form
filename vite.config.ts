import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { spawn, type ChildProcess } from "node:child_process";

const API_PORT = 8788;

function cloudflarePagesDev(): Plugin {
  let wrangler: ChildProcess | undefined;

  return {
    name: "cloudflare-pages-dev",
    apply: "serve",
    configureServer(server) {
      wrangler = spawn(
        "npx",
        ["wrangler", "pages", "dev", "dist", "--port", String(API_PORT)],
        { stdio: "inherit", shell: true },
      );

      const stopWrangler = () => {
        wrangler?.kill("SIGTERM");
      };

      process.on("exit", stopWrangler);
      process.on("SIGINT", stopWrangler);
      process.on("SIGTERM", stopWrangler);

      server.httpServer?.once("close", stopWrangler);
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflarePagesDev()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: `http://127.0.0.1:${API_PORT}`,
        changeOrigin: true,
      },
    },
  },
});
