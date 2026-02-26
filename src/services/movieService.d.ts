import { ResultadoRecomendacao } from "../types/ResultadoRecomendacao";
import { Filme } from "../types/Filme";

export function buscarRecomendacoes(textoSentimento: string): Promise<ResultadoRecomendacao>;

export function buscarDetalhesFilme(filmeId: number): Promise<Filme>;
