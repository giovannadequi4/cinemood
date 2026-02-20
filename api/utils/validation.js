/**
 * Utilitários de validação de dados
 * @module utils/validation
 */

const { config } = require('../config');

/**
 * Valida o texto do sentimento do usuário
 * @param {string} texto - Texto a validar
 * @returns {{valido: boolean, erro?: string}}
 */
function validarTextoSentimento(texto) {
  // Verificar se existe
  if (!texto) {
    return { 
      valido: false, 
      erro: 'Texto não fornecido' 
    };
  }

  // Verificar tipo
  if (typeof texto !== 'string') {
    return { 
      valido: false, 
      erro: 'Texto deve ser uma string' 
    };
  }

  // Verificar se não está vazio
  const textoLimpo = texto.trim();
  if (textoLimpo.length === 0) {
    return { 
      valido: false, 
      erro: 'Por favor, descreva como você está se sentindo' 
    };
  }

  // Verificar tamanho mínimo
  if (textoLimpo.length < config.validation.minTextLength) {
    return { 
      valido: false, 
      erro: `Texto muito curto. Mínimo: ${config.validation.minTextLength} caracteres` 
    };
  }

  // Verificar tamanho máximo
  if (textoLimpo.length > config.validation.maxTextLength) {
    return { 
      valido: false, 
      erro: `Texto muito longo. Máximo: ${config.validation.maxTextLength} caracteres` 
    };
  }

  return { valido: true };
}

/**
 * Sanitiza texto removendo caracteres perigosos
 * @param {string} texto - Texto a sanitizar
 * @returns {string}
 */
function sanitizarTexto(texto) {
  return texto
    .trim()
    .replace(/[<>]/g, '') // Remove < e >
    .substring(0, config.validation.maxTextLength);
}

module.exports = {
  validarTextoSentimento,
  sanitizarTexto
};
