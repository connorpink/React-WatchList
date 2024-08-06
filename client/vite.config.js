import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "/React-Portfolio",

  // code to use when server is local
  // server: {
  //   proxy: {
  //     "/server": {
  //       // target: "http://52.15.154.227:4000",
  //       target: "https://server-472zsol2dq-ue.a.run.app",
  //       // target: "http://localhost:4000",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/server/, ""),
  //     },
  //   },
  // },
});
