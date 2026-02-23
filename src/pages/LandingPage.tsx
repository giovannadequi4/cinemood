import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/search"); 
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="80vh"
      p={6}
    >
      <VStack spacing={6} textAlign="center" maxW="600px">
        <Heading as="h1" size="2xl">
          🎬 CineMood
        </Heading>

        <Text fontSize="lg">
          Menos tempo escolhendo, mais tempo assistindo.         
        </Text>

        <Text fontSize="md" color="gray.500">
          Escreva como você está se sentindo e receba recomendações personalizadas com IA, validadas com dados reais do TMDB.
        </Text>

        <Button colorScheme="teal" size="lg" onClick={handleStart}>
          Começar
        </Button>

        <Box pt={6}>
            <Text fontSize="sm" color="gray.400">
                <a href="https://linkedin.com/in/giovanna-dequi" target="_blank" rel="noopener noreferrer"> Desenvolvido por Giovanna, estudante de ADS, apaixonada por tecnologia e IA.  </a>
            </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default LandingPage;