import {
  Box,
  Text,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Heading,
  Divider,
  VStack,
  Image
} from "@chakra-ui/react";
import { keyframes } from "@emotion/react";
import { useApp } from "../context/AppContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Results = () => {
  const { results } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!results) {
      navigate("/search");
    }
  }, [results, navigate]);

  if (!results) return null;

  return (
    <VStack spacing={10} align="stretch" w="full" maxW="1200px" mx="auto">
      <Box borderLeft="4px solid" borderColor="brand.600" pl={4}>
        <Text fontSize="sm" opacity={0.6}>
          Análise baseada em:
        </Text>
        <Text fontSize="xl" fontStyle="italic">
          "{results.textoAnalisado}"
        </Text>

        <Text mt={3} opacity={0.8}>
          {results.analiseEmocional}
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
        {results.filmes.map((filme, index) => (
          <Card
            key={filme.id}
            bg="rgba(255,255,255,0.03)"
            backdropFilter="blur(14px)"
            border="1px solid"
            borderColor="rgba(255,255,255,0.06)"
            borderRadius="2xl"
            transition="all 0.3s ease"
            _hover={{
              transform: "translateY(-6px)",
              borderColor: "brand.600",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)"
            }}
            animation={`${fadeIn} 0.6s ease-out`}
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => navigate(`/movie/${filme.id}`)}
            cursor="pointer"
          >
            <CardBody>
              <Badge colorScheme="brand" mb={3}>
                {filme.nota.toFixed(1)} ⭐
              </Badge>

              <Heading size="md" mb={3}>
                {filme.titulo}
              </Heading>

              {filme.poster && (
                <Image
                  src={filme.poster}
                  alt={filme.titulo}
                  borderRadius="lg"
                  mb={4}
                />
              )}

              <Divider my={3} />

              <Text fontSize="sm" opacity={0.5}>
                {filme.motivoRecomendacao}
              </Text>
            </CardBody>
          </Card>
        ))}
      </SimpleGrid>
    </VStack>
  );
};

export default Results; 