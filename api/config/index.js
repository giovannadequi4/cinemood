/**
 * Configurações centralizadas do backend
 * @module config
 */

const config = {
  // APIs
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: "gemini-2.5-flash",
    temperature: 0.3,
    maxTokens: 3000
  },
  
  tmdb: {
    apiKey: process.env.TMDB_API_KEY,
    baseUrl: 'https://api.themoviedb.org/3',
    imageBaseUrl: 'https://image.tmdb.org/t/p/w500',
    language: 'pt-BR'
  },

  // Limites e validações
  validation: {
    maxTextLength: 1000,
    minTextLength: 5,
    maxMovies: 3
  },

  // CORS
  cors: {
    allowedOrigins: '*',
    allowedMethods: 'GET,OPTIONS,POST,PUT',
    allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  }
};

// Validar configurações obrigatórias
function validateConfig() {
  const errors = [];

  if (!config.gemini.apiKey) {
    errors.push('GEMINI_API_KEY não configurada');
  }

  if (!config.tmdb.apiKey) {
    errors.push('TMDB_API_KEY não configurada');
  }

  return errors;
}

module.exports = {
  config,
  validateConfig
};
