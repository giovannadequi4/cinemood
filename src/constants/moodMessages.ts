import { MoodType } from "../types/Mood";

export const MOOD_MESSAGES: Record<
  MoodType,
  { label: string; phrase: string }
> = {
  [MoodType.ANXIOUS]: {
    label: "Ansioso",
    phrase:
      "Estou um pouco ansioso e quero um filme intenso.",
  },
  [MoodType.INDIFFERENT]: {
    label: "Indiferente",
    phrase:
      "Me sinto indiferente e quero algo que me tire da zona de conforto.",
  },
  [MoodType.HAPPY]: {
    label: "Tranquilo",
    phrase:
      "Estou tranquilo e quero um filme leve e com boa energia.",
  },
  [MoodType.SAD]: {
    label: "Triste",
    phrase:
      "Estou um pouco triste e quero algo reconfortante.",
  },
};