import { extendTheme } from "@chakra-ui/react";

const rctheme = extendTheme({
    styles: {
        global: {
        },
    },
    config: {
        useSystemColorMode: false,
        initialColorMode: "dark",
    },
});

export default rctheme;
