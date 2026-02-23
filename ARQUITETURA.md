# 🏗️ Guia de Arquitetura do Backend

## 📐 Princípios Arquiteturais

### 1. Separation of Concerns (SoC)

Cada módulo possui responsabilidade bem definida.

Estrutura adotada:

api/recommend.js        → Orquestração da requisição
api/services/gemini     → Integração com Gemini
api/services/tmdb       → Integração com TMDB
api/utils/validation    → Validação de entrada
api/utils/response      → Padronização de respostas

Objetivo:

* Reduzir acoplamento
* Facilitar manutenção
* Permitir evolução independente das camadas

---

### 2. DRY (Don't Repeat Yourself)

Comportamentos compartilhados são centralizados.

Exemplo: configuração de CORS e formatação de respostas ficam em `utils/response.js`, evitando repetição nos endpoints.

Benefícios:

* Menos duplicação
* Menor risco de inconsistência
* Manutenção simplificada

---

### 3. Single Responsibility Principle (SRP)

Cada serviço executa apenas uma responsabilidade principal.

* `GeminiService` → Geração de recomendações via IA
* `TMDBService` → Validação e enriquecimento de dados de filmes

Isso evita serviços “god objects” e facilita testes isolados.

---

## 📂 Estrutura do Backend

### `/api/config/`

Responsável por centralizar configurações e variáveis de ambiente.

Exemplo:

```javascript
module.exports = {
  config: {
    gemini: { apiKey, model, temperature },
    tmdb: { apiKey, baseUrl },
    validation: { maxTextLength }
  },
  validateConfig()
};
```

Motivação:

* Alterações concentradas em um único ponto
* Facilidade para alternar ambientes
* Validação inicial de configuração

---

### `/api/services/`

Camada de lógica de negócio e integrações externas.

#### `geminiService.js`

Responsabilidades:

* Construção de prompt
* Chamada à API do Gemini
* Tratamento da resposta da IA

#### `tmdbService.js`

Responsabilidades:

* Busca de filmes
* Validação das recomendações
* Normalização dos dados retornados

Separar os serviços reduz acoplamento entre provedores externos.

---

### `/api/utils/`

Funções reutilizáveis e independentes de domínio.

#### `validation.js`

* Validação do texto enviado pelo usuário
* Sanitização básica de entrada

#### `response.js`

* Respostas padronizadas de sucesso
* Tratamento uniforme de erros
* Configuração de CORS

Essa padronização garante consistência da API.

---

### `/api/recommend.js`

Endpoint responsável por orquestrar o fluxo.

Fluxo simplificado:

1. Configurar CORS
2. Validar método HTTP
3. Validar entrada
4. Gerar recomendações via Gemini
5. Validar filmes via TMDB
6. Retornar resposta padronizada

O endpoint não contém regra de negócio complexa — apenas coordena serviços.

---

## 🔄 Fluxo de Requisição

Cliente
↓
POST /api/recommend
↓
Validação de entrada
↓
GeminiService → geração de recomendações
↓
TMDBService → validação e enriquecimento
↓
Resposta padronizada
↓
Cliente

---

## 🎯 Benefícios da Arquitetura

### Testabilidade

Serviços podem ser testados isoladamente, sem necessidade de executar o endpoint completo.

### Manutenibilidade

Trocar o provedor de IA ou a API de filmes exige alteração apenas na camada de serviço correspondente.

### Reutilização

Serviços e validações podem ser reaproveitados em novos endpoints.

### Escalabilidade

A estrutura permite evoluir para:

* Cache (Redis ou memória)
* Rate limiting
* Middleware de autenticação
* Camada de Use Cases
* Persistência em banco de dados

---

## 🚀 Evoluções Possíveis

### Middleware

Separar autenticação e tratamento de requisição em camada própria.

### Repositories

Adicionar abstração para persistência quando houver banco de dados.

### Use Cases

Criar camada intermediária entre endpoint e serviços para aplicar regras de negócio mais complexas.

---

## 📚 Referências Conceituais

* Clean Architecture — Robert C. Martin
* Domain-Driven Design — Eric Evans
* Princípios SOLID
