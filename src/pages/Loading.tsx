import { Center, Spinner, VStack, Text } from "@chakra-ui/react";

const Loading = () => (
  <Center py={40} flexDirection="column">
    <Spinner size="xl" color="brand.300" mb={6} />
    <VStack>
      <Text fontSize="2xl" fontWeight="bold">
        Sintonizando emoções...
      </Text>
      <Text opacity={0.5}>
        Nossa IA está mergulhando no seu relato.
      </Text>
    </VStack>
  </Center>
);

export default Loading;
