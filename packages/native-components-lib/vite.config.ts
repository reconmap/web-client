import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        dts({
            outDir: "dist",
            include: ["src"],
        }),
    ],
    build: {
        lib: {
            entry: "src/index.ts",
            name: "@reconmap/native-components",
            fileName: (format) => `reconmap-native-components.${format}.js`,
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {},
            },
        },
        target: "esnext",
    },
});
