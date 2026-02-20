import { Filme } from "./Filme";
export interface ResultadoRecomendacao {
  textoAnalisado: string;
  analiseEmocional: string;
  filmes: Filme[];
  totalFilmes: number;
  filmesValidados: number;
  geradoPorIA: boolean;
}