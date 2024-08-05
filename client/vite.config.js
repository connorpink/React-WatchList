import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/React-Portfolio",

  // code to use when server is local
  // server: {
  //   proxy: {
  //     "/server": {
  //       target: "http://3.22.216.215:4000",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/server/, ""),
  //     },
  //   },
  // },
});
