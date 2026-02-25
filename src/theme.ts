import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: "#111217",
        color: "#e4e4e7",
      },
    },
  },
  colors: {
    brand: {
      50:  "#f4e6e9",
      100: "#e6c2c9",
      200: "#d79aa6",
      300: "#c66f82",
      400: "#b0445e",
      500: "#6b1d2a",
      600: "#571823",
      700: "#43121b",
      800: "#2f0c12",
      900: "#1b070a",
    },
    accent: {
      500: "#a83246",
    },
    gray: {
      950: "#0c0d11",
    },
  },
  components: {
    Textarea: {
      baseStyle: {
        _focus: {
          borderColor: "brand.500",
          boxShadow: "0 0 0 1px var(--chakra-colors-brand-500)",
        },
      },
    },
  },
});