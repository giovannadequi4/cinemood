import MoodInput from "../components/MoodInput";
import { useApp } from "../context/AppContext";
import { buscarRecomendacoes } from '../services/movieService';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { mood, setMood, setResults, setLoading, setError } = useApp();

  const handleBuscar = async () => {
  if (!mood.trim()) return;

  try {
    setLoading(true);
    setError(null);

    const dados = await buscarRecomendacoes(mood);
    setResults(dados);

    navigate("/results");
  } catch (err) {
    setError("Erro ao buscar recomendações");
  } finally {
    setLoading(false);
  }
};

  return (
    <MoodInput
      mood={mood}
      setMood={setMood}
      onSearch={handleBuscar}
    />
  );
};

export default Home;
