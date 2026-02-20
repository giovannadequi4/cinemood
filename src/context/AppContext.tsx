import { createContext, useContext, useState } from "react";
import { ResultadoRecomendacao } from "../interfaces/ResultadoRecomendacao";

interface AppContextType {
  mood: string;
  setMood: (value: string) => void;

  results: ResultadoRecomendacao | null;
  setResults: (value: ResultadoRecomendacao | null) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;

  error: string | null;
  setError: (value: string | null) => void;

  resetApp: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [mood, setMood] = useState("");
  const [results, setResults] = useState<ResultadoRecomendacao | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetApp = () => {
    setMood("");
    setResults(null);
    setError(null);
  };

  return (
    <AppContext.Provider
      value={{
        mood,
        setMood,
        results,
        setResults,
        loading,
        setLoading,
        error,
        setError,
        resetApp
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used inside AppProvider");
  return context;
};