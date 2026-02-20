import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./theme";
import NavProvider from "./navigation/NavProvider";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <NavProvider />
    </ChakraProvider>
  );
}
