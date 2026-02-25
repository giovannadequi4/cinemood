import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate("/search"); 
  };

  return (
    
      <VStack spacing={6} textAlign="center" maxW="600px">
        <img src={logo} alt="CineMood" height={150} width={150} />

        <Text fontSize="lg">
          Menos tempo escolhendo, mais tempo assistindo.         
        </Text>

        <Text fontSize="md" color="gray.400">
          Escreva como você está se sentindo e receba recomendações personalizadas com IA, validadas com dados reais do TMDB.
        </Text>

        <Button colorScheme="brand" size="lg" onClick={handleStart}>
          Começar
        </Button>

        <Box pt={6}>
            <Text fontSize="sm" color="gray.300">
                <a href="https://linkedin.com/in/giovanna-dequi" target="_blank" rel="noopener noreferrer"> Desenvolvido por Giovanna, estudante de ADS, apaixonada por tecnologia e IA.  </a>
            </Text>
        </Box>
      </VStack>
  );
};

export default LandingPage;