/**
 * Serviço de API para recomendação de filmes
 * Centraliza todas as chamadas para o backend
 */

const API_BASE_URL = '/api';

/**
 * Busca recomendações de filmes baseadas no sentimento do usuário
 * @param {string} textoSentimento
 * @returns {Promise<Object>}
 */
export async function buscarRecomendacoes(textoSentimento) {
  try {
    const response = await fetch(`${API_BASE_URL}/recommend`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        texto: textoSentimento
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || `Erro HTTP: ${response.status}`);
    }

    if (!data.sucesso) {
      throw new Error(data.erro || 'Resposta inválida da API');
    }

    return data.dados;

  } catch (erro) {
    console.error('❌ Erro ao buscar recomendações:', erro);
    throw erro;
  }
}

/**
 * Busca detalhes de um filme específico por ID
 * @param {number} filmeId
 * @returns {Promise<Object>}
 */
export async function buscarDetalhesFilme(filmeId) {
  try {
    const response = await fetch(`${API_BASE_URL}/movie?id=${filmeId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.erro || `Erro HTTP: ${response.status}`);
    }

    if (!data.sucesso) {
      throw new Error(data.erro || 'Filme não encontrado');
    }

    return data.filme;

  } catch (erro) {
    console.error('❌ Erro ao buscar detalhes do filme:', erro);
    throw erro;
  }
}
