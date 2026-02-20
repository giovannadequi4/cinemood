/**
 * Utilitários para respostas HTTP padronizadas
 * @module utils/response
 */

const { config } = require('../config');

/**
 * Configura headers CORS na resposta
 * @param {Object} res - Objeto de resposta do Express/Vercel
 */
function configurarCORS(res) {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', config.cors.allowedOrigins);
  res.setHeader('Access-Control-Allow-Methods', config.cors.allowedMethods);
  res.setHeader('Access-Control-Allow-Headers', config.cors.allowedHeaders);
}

/**
 * Resposta de sucesso padronizada
 * @param {Object} res - Objeto de resposta
 * @param {Object} dados - Dados a retornar
 * @param {Object} metadata - Metadados opcionais
 */
function respostaSucesso(res, dados, metadata = {}) {
  return res.status(200).json({
    sucesso: true,
    dados,
    metadata: {
      timestamp: new Date().toISOString(),
      ...metadata
    }
  });
}

/**
 * Resposta de erro padronizada
 * @param {Object} res - Objeto de resposta
 * @param {number} status - Código HTTP
 * @param {string} mensagem - Mensagem de erro
 * @param {Object} detalhes - Detalhes opcionais
 */
function respostaErro(res, status, mensagem, detalhes = null) {
  const resposta = {
    sucesso: false,
    erro: mensagem,
    timestamp: new Date().toISOString()
  };

  if (detalhes) {
    resposta.detalhes = detalhes;
  }

  return res.status(status).json(resposta);
}

/**
 * Resposta de erro 400 (Bad Request)
 */
function erroBadRequest(res, mensagem, detalhes = null) {
  return respostaErro(res, 400, mensagem, detalhes);
}

/**
 * Resposta de erro 500 (Internal Server Error)
 */
function erroInterno(res, mensagem, detalhes = null) {
  return respostaErro(res, 500, mensagem, detalhes);
}

/**
 * Resposta de erro 401 (Unauthorized)
 */
function erroAutorizacao(res, mensagem) {
  return respostaErro(res, 401, mensagem);
}

module.exports = {
  configurarCORS,
  respostaSucesso,
  respostaErro,
  erroBadRequest,
  erroInterno,
  erroAutorizacao
};
