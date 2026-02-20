/**
 * API Endpoint: POST /api/recommend
 * Gera recomendações de filmes usando Gemini AI e valida com TMDB
 * @module api/recommend
 */

const geminiService = require('./services/geminiService');
const tmdbService = require('./services/tmdbService');
const { validarTextoSentimento, sanitizarTexto } = require('./utils/validation');
const { configurarCORS, respostaSucesso, erroBadRequest, erroInterno } = require('./utils/response');
const { validateConfig } = require('./config');

/**
 * Handler principal do endpoint
 */
module.exports = async (req, res) => {
  // Configurar CORS
  configurarCORS(res);

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Apenas POST permitido
  if (req.method !== 'POST') {
    return erroBadRequest(res, 'Método não permitido. Use POST.');
  }

  // Validar configurações
  const errosConfig = validateConfig();
  if (errosConfig.length > 0) {
    return erroInterno(res, 'Configuração incompleta', { erros: errosConfig });
  }

  try {
    // Extrair dados do body
    const { texto } = req.body;

    // Validar entrada
    const validacao = validarTextoSentimento(texto);
    if (!validacao.valido) {
      return erroBadRequest(res, validacao.erro, {
        exemplo: { texto: "Estou me sentindo muito feliz hoje!" }
      });
    }

    // Sanitizar texto
    const textoSanitizado = sanitizarTexto(texto);

    console.log('\n🎬 === NOVA REQUISIÇÃO ===');
    console.log('📝 Sentimento:', textoSanitizado.substring(0, 100));

    // PASSO 1: Gerar recomendações com Gemini
    const { analise, recomendacoes } = await geminiService.gerarRecomendacoes(textoSanitizado);
    console.log('📊 Análise gerada');
    console.log('🎥 Filmes recomendados:', recomendacoes.length);

    // PASSO 2: Validar filmes no TMDB
    const filmesValidados = await tmdbService.validarRecomendacoes(recomendacoes);

    // Contar filmes encontrados
    const filmesEncontrados = filmesValidados.filter(f => f.validado).length;

    console.log(`✅ Processamento completo: ${filmesEncontrados}/${recomendacoes.length} validados`);
    console.log('🎬 === FIM DA REQUISIÇÃO ===\n');

    // Retornar resposta
    return respostaSucesso(res, {
      textoAnalisado: textoSanitizado.substring(0, 200),
      analiseEmocional: analise,
      filmes: filmesValidados,
      totalFilmes: filmesValidados.length,
      filmesValidados: filmesEncontrados,
      geradoPorIA: true
    }, {
      fontes: {
        ia: 'Google Gemini 1.5 Flash',
        validacao: 'TMDB (The Movie Database)'
      }
    });

  } catch (erro) {
    console.error('❌ Erro no endpoint:', erro);

    // Tratamento de erros específicos do Gemini
    if (erro.message?.includes('API_KEY_INVALID')) {
      return erroInterno(res, 'Chave da API Gemini inválida');
    }

    if (erro.message?.includes('QUOTA_EXCEEDED')) {
      return erroInterno(res, 'Limite de uso da API Gemini excedido. Tente novamente mais tarde.');
    }

    // Tratamento de erros do TMDB
    if (erro.response?.status === 401) {
      return erroInterno(res, 'Chave da API TMDB inválida');
    }

    // Erro genérico
    return erroInterno(res, 'Erro ao processar solicitação', {
      mensagem: erro.message,
      tipo: erro.name
    });
  }
};
