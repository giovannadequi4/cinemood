import {
  Box,
  Heading,
  Textarea,
  Stack,
  Button,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";

interface Props {
  mood: string;
  setMood: (value: string) => void;
  onSearch: () => void;
  error?: string | null;
}

const MoodInput = ({ mood, setMood, onSearch, error }: Props) => {
  return (
    <Box w="100%" maxW="600px">
      <Heading size="xl" mb={4} textAlign="center">
        Como você está se sentindo hoje?
      </Heading>

      <Box
        w="full"
        p={6}
        bg="rgba(255,255,255,0.03)"
        backdropFilter="blur(12px)"
        borderRadius="2xl"
      >
        <FormControl isInvalid={!!error}>
          <Textarea
            placeholder="Ex: Tive uma semana cansativa..."
            mb={2}
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            _focus={{
              borderColor: "brand.300",
              boxShadow: "0 0 0 1px var(--chakra-colors-brand-600)",
            }}
          />
          {error && <FormErrorMessage>{error}</FormErrorMessage>}
        </FormControl>

        <Stack direction="row" spacing={2} mb={6} mt={4} flexWrap="wrap">
          {["Ansioso", "Indiferente", "Feliz", "Triste"].map((m) => (
            <Button
              key={m}
              size="xs"
              onClick={() => setMood(m)}
              variant="ghost"
            >
              {m}
            </Button>
          ))}
        </Stack>

        <Button w="full" colorScheme="brand" onClick={onSearch}>
          Encontrar meu filme
        </Button>
      </Box>
    </Box>
  );
};

export default MoodInput;