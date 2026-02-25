import { Flex, VStack, Heading, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Header = () => {
  const navigate = useNavigate();
  const { results, resetApp } = useApp();

  const showReset = !!results;

  const handleReset = () => {
    resetApp();
    navigate("/");
  };

  return (
    <Flex
      as="header"
      justify="space-between"
      align="center"
      mb={10}
      w="full"
      maxW="1200px"
      mx="auto"
    >
      <VStack
        align="start"
        spacing={0}
        onClick={handleReset}
        cursor="pointer"
      >
        <Heading size="lg" color="brand.100">
          CineMood
        </Heading>

        <Text fontSize="xs" opacity={0.6} fontWeight="bold">
          Emotional AI
        </Text>
      </VStack>

      {showReset && (
        <Button
          size="sm"
          colorScheme="brand"
          onClick={handleReset}
        >
          Refazer Busca
        </Button>
      )}
    </Flex>
  );
};

export default Header;