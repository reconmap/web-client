import { extendTheme } from "@chakra-ui/react";
import { mode } from '@chakra-ui/theme-tools';

const ReconmapTheme = extendTheme({
    styles: {
        global: (props) => ({
            body: {
                fontFamily: 'body',
                color: mode('gray.800', 'whiteAlpha.900')(props),
                bg: mode('#fff', 'var(--color-gray-dark)')(props),
                lineHeight: 'base',
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
            }
        }),
    },
    defaultProps: {
        size: "sm",
    },
    config: {
        useSystemColorMode: false,
        initialColorMode: "dark",
    },
});

export default ReconmapTheme;
