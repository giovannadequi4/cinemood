const { GoogleGenAI } = require("@google/genai");
const { config } = require("../config");

class GeminiService {
  constructor() {
    this.client = new GoogleGenAI({
      apiKey: config.gemini.apiKey
    });

    this.model = config.gemini.model; 
  }

  async gerarRecomendacoes(sentimentoUsuario) {
    try {
      const prompt = this._construirPrompt(sentimentoUsuario);

      const response = await this.client.models.generateContent({
        model: this.model,
        contents: prompt,
        config: {
          temperature: config.gemini.temperature,
          maxOutputTokens: config.gemini.maxTokens
        }
      });

      const text = response.text;
      const dados = JSON.parse(text);

      return {
        analise: dados.analysis || dados.analise || "Análise não disponível",
        recomendacoes: dados.recommendations || dados.recomendacoes || []
      };

    } catch (erro) {
      console.error("Erro no Gemini Service:", erro);
      throw new Error(`Falha ao gerar recomendações: ${erro.message}`);
    }
  }

  /**
   * Constrói o prompt otimizado para o Gemini
   * @private
   */
  _construirPrompt(sentimentoUsuario) {
    return `Você é um especialista em cinema com foco em impacto emocional.
    Com base no sentimento abaixo, sugira exatamente 3 filmes.

    REGRAS IMPORTANTES:
    * Filmes reais e conhecidos internacionalmente
    * Entre 1995 e 2024
    * Evite filmes extremamente pesados ou polêmicos
    * Priorize filmes populares e bem avaliados
    * Use SEMPRE o título original em inglês (ex: "The Shawshank Redemption", não "Um Sonho de Liberdade")
    * Seja específico e contextual na análise

    FORMATO DE RESPOSTA (JSON PURO - SEM MARKDOWN):
    {
      "analysis": "Breve análise emocional do usuário (2-3 frases, tom empático)",
      "recommendations": [
        {
          "title": "Título Original em Inglês",
          "year": 2020,
          "reason": "Explicação detalhada de por que este filme se conecta com o sentimento (50-80 palavras)"
        }
      ]
    }

    SENTIMENTO DO USUÁRIO:
    "${sentimentoUsuario}"

    Responda APENAS com o JSON, sem markdown, sem explicações extras.`;
  }

  isConfigured() {
    return !!config.gemini.apiKey;
  }
}

module.exports = new GeminiService();