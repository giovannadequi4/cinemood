import { createContext, useContext, useState } from "react";
import { ResultadoRecomendacao } from "../types/ResultadoRecomendacao";
import { AppErrorType } from "../types/Error";
import { AppContextType } from "../types/AppContext";

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {

  const [error, setError] = useState<AppErrorType | null>(null);
  const [mood, setMood] = useState("");
  const [results, setResults] = useState<ResultadoRecomendacao | null>(null);
  const [loading, setLoading] = useState(false);

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