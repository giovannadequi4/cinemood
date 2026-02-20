import { ResultadoRecomendacao } from "../interfaces/ResultadoRecomendacao";
import { Filme } from "../interfaces/Filme";

export function buscarRecomendacoes(textoSentimento: string): Promise<ResultadoRecomendacao>;

export function buscarDetalhesFilme(filmeId: number): Promise<Filme>;
