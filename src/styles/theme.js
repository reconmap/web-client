import { extendTheme } from "@chakra-ui/react";

const rctheme = extendTheme({
    styles: {
        global: {
            body :{
                backgroundColor: 'gray.800',
                color: 'gray.300',
            },
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
            },
            button: {
                padding: "0.45rem 0.9rem",
            },
            input: {
                padding: "0.45rem 0.9rem",
            },
            select: {
                padding: "0.45rem 0.9rem",
            },
        },
    },
    config: {
        useSystemColorMode: false,
        initialColorMode: "dark",
    },
});
export default rctheme;
