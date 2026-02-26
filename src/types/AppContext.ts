import { ResultadoRecomendacao } from "./ResultadoRecomendacao";
import { AppErrorType } from "./Error";

export interface AppContextType {
  mood: string;
  setMood: (value: string) => void;

  results: ResultadoRecomendacao | null;
  setResults: (value: ResultadoRecomendacao | null) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;

  error: AppErrorType | null;
  setError: (value: AppErrorType | null) => void;

  resetApp: () => void;
}