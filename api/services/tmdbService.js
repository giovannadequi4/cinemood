/**
 * Serviço de integração com TMDB (The Movie Database)
 * @module services/tmdbService
 */

const axios = require('axios');
const { config } = require('../config');

class TMDBService {
  /**
   * Busca um filme no TMDB por título e ano
   * @param {string} titulo - Título do filme (preferencialmente em inglês)
   * @param {number} ano - Ano de lançamento
   * @returns {Promise<Object|null>} Dados do filme ou null se não encontrado
   */
  async buscarFilme(titulo, ano) {
    try {
      // Primeira tentativa: com ano
      let filme = await this._buscarComAno(titulo, ano);
      
      // Segunda tentativa: sem ano (caso o ano esteja ligeiramente diferente)
      if (!filme) {
        console.log(`⚠️  Tentando buscar "${titulo}" sem ano específico...`);
        filme = await this._buscarSemAno(titulo);
      }

      if (filme) {
        console.log(`✅ Filme encontrado: "${filme.titulo}" (${filme.ano})`);
        return this._formatarFilme(filme);
      }

      console.log(`❌ Filme não encontrado: "${titulo}" (${ano})`);
      return null;

    } catch (erro) {
      console.error(`Erro ao buscar filme "${titulo}":`, erro.message);
      return null;
    }
  }

  /**
   * Valida múltiplas recomendações do Gemini
   * @param {Array} recomendacoes - Lista de recomendações da IA
   * @returns {Promise<Array>} Lista de filmes validados
   */
  async validarRecomendacoes(recomendacoes) {
    console.log('🔍 Validando filmes no TMDB...');

    const filmesValidados = await Promise.all(
      recomendacoes.map(rec => this._validarRecomendacao(rec))
    );

    const filmesEncontrados = filmesValidados.filter(f => f.validado).length;
    console.log(`✅ Validação completa: ${filmesEncontrados}/${recomendacoes.length} filmes encontrados`);

    return filmesValidados;
  }

  /**
   * Valida uma única recomendação
   * @private
   */
  async _validarRecomendacao(recomendacao) {
    const filmeValidado = await this.buscarFilme(
      recomendacao.title, 
      recomendacao.year
    );

    if (filmeValidado) {
      return {
        ...filmeValidado,
        motivoRecomendacao: recomendacao.reason,
        recomendadoPelaIA: true,
        validado: true
      };
    }

    // Filme não encontrado - retorna dados mínimos
    return {
      titulo: recomendacao.title,
      ano: recomendacao.year,
      motivoRecomendacao: recomendacao.reason,
      recomendadoPelaIA: true,
      validado: false,
      aviso: 'Este filme não foi encontrado na base de dados do TMDB. O título ou ano podem estar incorretos.'
    };
  }

  /**
   * Busca filme com ano específico
   * @private
   */
  async _buscarComAno(titulo, ano) {
    const response = await axios.get(`${config.tmdb.baseUrl}/search/movie`, {
      params: {
        api_key: config.tmdb.apiKey,
        query: titulo,
        language: config.tmdb.language,
        year: ano
      }
    });

    return response.data.results?.[0] || null;
  }

  /**
   * Busca filme sem ano (mais flexível)
   * @private
   */
  async _buscarSemAno(titulo) {
    const response = await axios.get(`${config.tmdb.baseUrl}/search/movie`, {
      params: {
        api_key: config.tmdb.apiKey,
        query: titulo,
        language: config.tmdb.language
      }
    });

    return response.data.results?.[0] || null;
  }

  /**
   * Formata dados do filme do TMDB para nosso padrão
   * @private
   */
  _formatarFilme(filme) {
    return {
      id: filme.id,
      titulo: filme.title,
      tituloOriginal: filme.original_title,
      sinopse: filme.overview || 'Sinopse não disponível',
      nota: filme.vote_average,
      votos: filme.vote_count,
      poster: filme.poster_path 
        ? `${config.tmdb.imageBaseUrl}${filme.poster_path}` 
        : null,
      backdrop: filme.backdrop_path 
        ? `${config.tmdb.imageBaseUrl}${filme.backdrop_path}` 
        : null,
      dataLancamento: filme.release_date,
      ano: filme.release_date ? filme.release_date.substring(0, 4) : null,
      popularidade: filme.popularity,
      generoIds: filme.genre_ids
    };
  }

  /**
   * Verifica se o serviço está configurado
   * @returns {boolean}
   */
  isConfigured() {
    return !!config.tmdb.apiKey;
  }
}

module.exports = new TMDBService();
