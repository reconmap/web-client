import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig({
    server: {
        host: true,
        port: 5500,
    },
    build: {
        outDir: "build",
    },
    plugins: [react(), viteTsconfigPaths(), svgrPlugin()],
    resolve: {
        alias: {
            "@reconmap/native-components": resolve(__dirname, "../native-components-lib/src"),
        },
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/setupTests.js",
        coverage: {
            provider: "v8",
            reporter: ["text", "html"],
            exclude: ["node_modules/", "src/setupTests.js"],
        },
    },
});
