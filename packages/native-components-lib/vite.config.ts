import { defineConfig } from "vite";

export default defineConfig({
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
