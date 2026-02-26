import { AppErrorType } from "../types/Error";

export const ERROR_MESSAGES: Record<AppErrorType, string> = {
  [AppErrorType.NETWORK]: "Erro de conexão. Verifique sua internet.",
  [AppErrorType.API]: "Nosso servidor não respondeu como esperado.",
  [AppErrorType.EMPTY]: "Não encontramos filmes para esse sentimento.",
  [AppErrorType.UNKNOWN]: "Ocorreu um erro inesperado.",
};