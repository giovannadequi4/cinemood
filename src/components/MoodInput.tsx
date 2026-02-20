import {
  Box, Heading, Textarea, Stack,
  Button
} from "@chakra-ui/react";

interface Props {
  mood: string;
  setMood: (value: string) => void;
  onSearch: () => void;
}

const MoodInput = ({ mood, setMood, onSearch }: Props) => {
  return (
      <Box w="100%" maxW="600px">

        <Heading size="xl" mb={4} textAlign="center">
          Como você está se sentindo hoje?
        </Heading>

        <Box
          w="full"
          p={6}
          bg="whiteAlpha.100"
          backdropFilter="blur(20px)"
          borderRadius="2xl"
        >
        <Textarea
          placeholder="Ex: Tive uma semana cansativa..."
          mb={4}
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />

        <Stack direction="row" spacing={2} mb={6} flexWrap="wrap">
          {["Ansioso", "Indiferente", "Feliz", "Triste"].map((m) => (
            <Button key={m} size="xs" variant="ghost" onClick={() => setMood(m)}>
              {m}
            </Button>
          ))}
        </Stack>

        <Button w="full" colorScheme="teal" onClick={onSearch}>
          Encontrar meu filme
        </Button>
      </Box>
    </Box>
  );
};

export default MoodInput;
