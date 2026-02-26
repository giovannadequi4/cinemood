export interface Filme {
  id: number;
  titulo: string;
  tituloOriginal: string;
  sinopse: string;
  nota: number;
  votos: number;
  poster: string;
  backdrop: string;
  dataLancamento: string;
  ano: string;
  popularidade: number;
  generoIds: number[];
  motivoRecomendacao: string;
  recomendadoPelaIA: boolean;
  validado: boolean;

  // TODO: trazer dados da API
  duracao?: number;
  generos?: string[];
}