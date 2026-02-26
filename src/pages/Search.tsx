import { AppErrorType } from "../types/Error";
import MoodInput from "../components/MoodInput";
import { useApp } from "../context/AppContext";
import { buscarRecomendacoes } from '../services/movieService';
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { warning } from "framer-motion";
import { useState } from "react";

const Search = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const { mood, setMood, setResults, setLoading, setError } = useApp();
  const [inputError, setInputError] = useState<string | null>(null);

  const contarPalavras = (texto: string) => {
    return texto
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
  };

  const validateInput = (text: string) => {
    const palavras = contarPalavras(text);
    if (!text.trim()) {
      setInputError("Digite algo antes de buscar.");
      return false;
    }

    if (palavras < 3) {
      setInputError(
        "Descreva com pelo menos 3 palavras. Você pode incluir intensidade, gênero ou época do filme."
      );
      return false;
    }

    setInputError(null);
    return true;
  };

  const handleBuscar = async () => {
    if (!validateInput(mood)) return;

    try {
      setLoading(true);
      setError(null);

      const dados = await buscarRecomendacoes(mood);

      if (!dados || dados === null) {
        setError(AppErrorType.EMPTY);
        return;
      }

      setResults(dados);
      navigate("/results");

    } catch (err: any) {
      if (!err.response) {
        setError(AppErrorType.NETWORK);
      } else {
        setError(AppErrorType.API);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <MoodInput
      mood={mood}
      setMood={setMood}
      onSearch={handleBuscar}
      error={inputError}
    />
  );
};

export default Search;
