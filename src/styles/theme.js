import { extendTheme } from "@chakra-ui/react";

const rctheme = extendTheme({
    styles: {
        global: {
            h1: {
                fontSize: "2.1rem",
            },
            h2: {
                fontSize: "1.75rem",
                fontWeight: "bold",
            },
            h3: {
                fontSize: "1.5rem",
            },
            h4: {
                fontSize: "1.2rem",
            }
        }
    },
    config: {
        useSystemColorMode: false,
        initialColorMode: "dark",
    },
});

export default rctheme;
