/**
 * API Endpoint: GET /api/movie?id=123
 * Retorna detalhes completos de um filme específico
 * @module api/movie
 */

const axios = require('axios');
const { config } = require('./config');
const { configurarCORS, respostaSucesso, erroBadRequest, erroInterno } = require('./utils/response');

module.exports = async (req, res) => {
  configurarCORS(res);

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return erroBadRequest(res, 'Método não permitido. Use GET.');
  }

  const { id } = req.query;

  if (!id) {
    return erroBadRequest(res, 'ID do filme é obrigatório', {
      exemplo: '/api/movie?id=550'
    });
  }

  try {
    const response = await axios.get(`${config.tmdb.baseUrl}/movie/${id}`, {
      params: {
        api_key: config.tmdb.apiKey,
        language: config.tmdb.language,
        append_to_response: 'credits,videos,similar'
      }
    });

    const filme = response.data;

    const resultado = {
      id: filme.id,
      titulo: filme.title,
      tituloOriginal: filme.original_title,
      sinopse: filme.overview,
      tagline: filme.tagline,
      nota: filme.vote_average,
      votos: filme.vote_count,
      poster: filme.poster_path ? `${config.tmdb.imageBaseUrl}${filme.poster_path}` : null,
      backdrop: filme.backdrop_path ? `${config.tmdb.imageBaseUrl}${filme.backdrop_path}` : null,
      dataLancamento: filme.release_date,
      duracao: filme.runtime,
      generos: filme.genres?.map(g => g.name) || [],
      orcamento: filme.budget,
      receita: filme.revenue,
      elenco: filme.credits?.cast?.slice(0, 10).map(p => ({
        nome: p.name,
        personagem: p.character,
        foto: p.profile_path ? `${config.tmdb.imageBaseUrl}${p.profile_path}` : null
      })) || [],
      diretor: filme.credits?.crew?.find(p => p.job === 'Director')?.name || null,
      trailer: filme.videos?.results?.find(v => v.type === 'Trailer' && v.site === 'YouTube')?.key || null,
      similares: filme.similar?.results?.slice(0, 5).map(f => ({
        id: f.id,
        titulo: f.title,
        poster: f.poster_path ? `${config.tmdb.imageBaseUrl}${f.poster_path}` : null,
        nota: f.vote_average
      })) || []
    };

    return respostaSucesso(res, { filme: resultado }, {
      fonte: 'TMDB (The Movie Database)'
    });

  } catch (erro) {
    if (erro.response?.status === 404) {
      return erroBadRequest(res, 'Filme não encontrado com esse ID');
    }
    return erroInterno(res, 'Erro ao buscar filme', { mensagem: erro.message });
  }
};
