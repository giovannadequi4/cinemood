import { ERROR_MESSAGES } from "../constants/errorMessages";
import { Center, VStack, Text, Button, HStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const ErrorState = () => {
  const navigate = useNavigate();
  const { error, setError } = useApp();
  
  return (
    <Center py={40} flexDirection="column">
      <VStack spacing={6} textAlign="center">
        <Text fontSize="3xl" fontWeight="bold">
          Sinto muito! Não conseguimos encontrar resultados.
        </Text>


        <Text opacity={0.6}>
          {error && ERROR_MESSAGES[error]}
        </Text>

        <HStack spacing={4} pt={4}>
          <Button
            size="md"
            variant="ghost"
            onClick={() => navigate("/search")}
          >
            Voltar para pesquisa
          </Button>
        </HStack>
      </VStack>
    </Center>
  );
};

export default ErrorState;