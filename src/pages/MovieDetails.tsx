import {
  Box,
  Text,
  Heading,
  Badge,
  Image,
  VStack,
  HStack,
  Divider,
  Button,
  Container
} from "@chakra-ui/react";
import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useEffect } from "react";

const MovieDetails = () => {
  const { id } = useParams();
  const { results } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!results) {
      navigate("/search");
    }
  }, [results, navigate]);

  if (!results) return null;

  const filme = results.filmes.find(
    (f) => String(f.id) === id
  );

  if (!filme) {
    navigate("/results");
    return null;
  }

  return (
    <Container maxW="1000px" py={10}>
      <VStack spacing={10} align="stretch">

        {/* Voltar */}
        <Button
          alignSelf="flex-start"
          variant="ghost"
          colorScheme="brand"
          onClick={() => navigate(-1)}
        >
          ← Voltar
        </Button>

        <HStack
          align="flex-start"
          spacing={10}
          flexDir={{ base: "column", md: "row" }}
        >
          {filme.poster && (
            <Image
              src={filme.poster}
              alt={filme.titulo}
              borderRadius="2xl"
              maxW="300px"
              boxShadow="0 20px 40px rgba(0,0,0,0.6)"
              filter="brightness(0.6)"
              transition="filter 0.8s ease"
              _hover={{
                filter: "brightness(0.85)"
              }}
            />
          )}

          <VStack align="stretch" spacing={6} flex="1">

            <Heading size="2xl">
              {filme.titulo}
            </Heading>
            <Text fontSize="sm" opacity={0.6} mb={3}>
              {filme.ano}
            </Text>

            <Badge
              alignSelf="flex-start"
              bg="brand.700"
              color="white"
              px={3}
              py={1}
              borderRadius="full"
            >
              {filme.nota.toFixed(1)} ⭐
            </Badge>

            <Divider borderColor="rgba(255,255,255,0.08)" />

            <Box>
              <Text fontWeight="bold" mb={2} opacity={0.7}>
                Sinopse
              </Text>
              <Text opacity={0.85}>
                {filme.sinopse}
              </Text>
            </Box>

            <Box>
              <Text fontWeight="bold" mb={2} opacity={0.7}>
                Por que recomendamos para você
              </Text>
              <Text opacity={0.75}>
                {filme.motivoRecomendacao}
              </Text>
            </Box>

          </VStack>
        </HStack>
      </VStack>
    </Container>
  );
};

export default MovieDetails;