import { MoodType } from "../types/Mood";

export const MOOD_MESSAGES: Record<
  MoodType,
  { label: string; phrase: string }
> = {
  [MoodType.ANXIOUS]: {
    label: "Ansioso",
    phrase:
      "Estou me sentindo ansioso e quero um filme intenso, envolvente e que prenda minha atenção.",
  },
  [MoodType.INDIFFERENT]: {
    label: "Indiferente",
    phrase:
      "Estou me sentindo indiferente e quero algo surpreendente que me tire da zona de conforto.",
  },
  [MoodType.HAPPY]: {
    label: "Feliz",
    phrase:
      "Estou me sentindo feliz e quero um filme leve, divertido e com boa energia.",
  },
  [MoodType.SAD]: {
    label: "Triste",
    phrase:
      "Estou me sentindo triste e quero algo emocionante ou reconfortante.",
  },
};