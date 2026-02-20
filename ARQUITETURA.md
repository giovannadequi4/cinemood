# 🏗️ Guia de Arquitetura do Backend

## 📐 Princípios Aplicados

### 1. Separation of Concerns (SoC)
Cada módulo tem UMA responsabilidade específica.

```
❌ ERRADO: Tudo em um arquivo
api/recommend.js → 500 linhas fazendo tudo

✅ CERTO: Separado por responsabilidade  
api/recommend.js        → Apenas roteamento
api/services/gemini     → Apenas Gemini
api/services/tmdb       → Apenas TMDB
api/utils/validation    → Apenas validações
```

### 2. DRY (Don't Repeat Yourself)
Código reutilizável em vez de duplicado.

```javascript
❌ ERRADO: Duplicar CORS em cada endpoint
// recommend.js
res.setHeader('Access-Control-Allow-Origin', '*');
// movie.js  
res.setHeader('Access-Control-Allow-Origin', '*');

✅ CERTO: Função reutilizável
// utils/response.js
function configurarCORS(res) { ... }

// Usar em todos endpoints
configurarCORS(res);
```

### 3. Single Responsibility Principle (SRP)
Cada classe/função faz UMA coisa.

```javascript
❌ ERRADO: Serviço faz tudo
class MovieService {
  gerarRecomendacoes() { ... }
  validarFilmes() { ... }
  formatarResposta() { ... }
}

✅ CERTO: Um serviço por responsabilidade
class GeminiService {
  gerarRecomendacoes() { ... }
}

class TMDBService {
  validarFilmes() { ... }
}
```

---

## 📂 Estrutura Detalhada

### `/api/config/`
**Responsabilidade:** Configurações centralizadas

```javascript
// index.js
module.exports = {
  config: {
    gemini: { apiKey, model, temperature },
    tmdb: { apiKey, baseUrl },
    validation: { maxTextLength }
  },
  validateConfig()
};
```

**Por que separar?**
- ✅ Mudanças em um lugar só
- ✅ Fácil de trocar entre dev/prod
- ✅ Validação centralizada

---

### `/api/services/`
**Responsabilidade:** Lógica de negócio

#### `geminiService.js`
```javascript
class GeminiService {
  // Gerar recomendações com IA
  async gerarRecomendacoes(texto) { }
  
  // Construir prompt otimizado
  _construirPrompt(texto) { }
  
  // Verificar se está configurado
  isConfigured() { }
}
```

**Por que um serviço?**
- ✅ Isola lógica do Gemini
- ✅ Fácil de testar isoladamente
- ✅ Pode ser usado em múltiplos endpoints

#### `tmdbService.js`
```javascript
class TMDBService {
  // Buscar filme por título/ano
  async buscarFilme(titulo, ano) { }
  
  // Validar lista de recomendações
  async validarRecomendacoes(lista) { }
  
  // Formatar dados do TMDB
  _formatarFilme(dados) { }
}
```

**Por que separar do Gemini?**
- ✅ Responsabilidades diferentes
- ✅ Pode ser usado independentemente
- ✅ Mais fácil de manter

---

### `/api/utils/`
**Responsabilidade:** Funções utilitárias reutilizáveis

#### `validation.js`
```javascript
// Validar entrada do usuário
function validarTextoSentimento(texto) { }

// Sanitizar para segurança
function sanitizarTexto(texto) { }
```

#### `response.js`
```javascript
// Padronizar respostas de sucesso
function respostaSucesso(res, dados) { }

// Padronizar erros
function erroBadRequest(res, msg) { }
function erroInterno(res, msg) { }

// Configurar CORS
function configurarCORS(res) { }
```

**Por que utils?**
- ✅ Evita código duplicado
- ✅ Consistência nas respostas
- ✅ Fácil de testar

---

### `/api/recommend.js`
**Responsabilidade:** Orquestrar o fluxo

```javascript
module.exports = async (req, res) => {
  // 1. Configurar CORS
  configurarCORS(res);
  
  // 2. Validar método
  if (req.method !== 'POST') return erroBadRequest(...);
  
  // 3. Validar entrada
  const validacao = validarTextoSentimento(texto);
  if (!validacao.valido) return erroBadRequest(...);
  
  // 4. Chamar serviço Gemini
  const { analise, recomendacoes } = await geminiService.gerarRecomendacoes(texto);
  
  // 5. Validar com TMDB
  const filmes = await tmdbService.validarRecomendacoes(recomendacoes);
  
  // 6. Retornar resposta padronizada
  return respostaSucesso(res, { analise, filmes });
};
```

**Por que esse endpoint é tão simples?**
- ✅ Toda lógica está nos serviços
- ✅ Fácil de entender o fluxo
- ✅ Fácil de adicionar features

---

## 🔄 Fluxo de uma Requisição

```
1. Cliente → POST /api/recommend
               ↓
2. recommend.js → Valida método/CORS
               ↓
3. validation.js → Valida entrada
               ↓
4. geminiService.js → Gera recomendações
               ↓
5. tmdbService.js → Valida filmes
               ↓
6. response.js → Formata resposta
               ↓
7. Cliente ← JSON padronizado
```

---

## 💡 Vantagens dessa Arquitetura

### 1. **Testabilidade**
```javascript
// Testar serviço isoladamente
const gemini = require('./services/geminiService');
test('deve gerar 3 filmes', async () => {
  const result = await gemini.gerarRecomendacoes('feliz');
  expect(result.recomendacoes).toHaveLength(3);
});
```

### 2. **Manutenibilidade**
```javascript
// Trocar Gemini por outra IA?
// Só mudar geminiService.js!

// Trocar TMDB por IMDB?
// Só mudar tmdbService.js!
```

### 3. **Reutilização**
```javascript
// Usar em outro endpoint
const { analise } = await geminiService.gerarRecomendacoes(texto);

// Usar validação em qualquer lugar
const valido = validarTextoSentimento(userInput);
```

### 4. **Escalabilidade**
```javascript
// Adicionar cache facilmente
class TMDBService {
  constructor() {
    this.cache = new Map();
  }
  
  async buscarFilme(titulo, ano) {
    const cached = this.cache.get(`${titulo}-${ano}`);
    if (cached) return cached;
    // ... buscar e cachear
  }
}
```

---

## 🎯 Quando Usar Cada Padrão

### Use **Services** quando:
- Lógica complexa de negócio
- Integrações com APIs externas
- Operações que serão reutilizadas

### Use **Utils** quando:
- Funções auxiliares simples
- Formatação de dados
- Validações genéricas

### Use **Config** quando:
- Variáveis de ambiente
- Constantes da aplicação
- Configurações que mudam entre ambientes

---

## 🚀 Próximos Passos (Escalando)

### 1. Adicionar Middleware
```javascript
// api/middleware/auth.js
function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ erro: 'Unauthorized' });
  next();
}
```

### 2. Adicionar Repositories (Banco de Dados)
```javascript
// api/repositories/userRepository.js
class UserRepository {
  async findById(id) { ... }
  async save(user) { ... }
}
```

### 3. Adicionar Use Cases
```javascript
// api/useCases/generateRecommendations.js
class GenerateRecommendationsUseCase {
  constructor(geminiService, tmdbService) { ... }
  async execute(texto) { ... }
}
```

---

## 📚 Leitura Recomendada

- Clean Architecture (Robert C. Martin)
- Domain-Driven Design (Eric Evans)
- SOLID Principles
- Microservices Patterns

---

**Dúvidas sobre a arquitetura? Leia este guia novamente! 🏗️**
