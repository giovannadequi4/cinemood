# 🎬 CineMatch - Recomendação de Filmes com Gemini AI

Sistema fullstack com **arquitetura profissional** que usa **Google Gemini (100% gratuito)** para recomendar filmes e valida com TMDB.

---

## 🏗️ Arquitetura do Backend

```
api/
├── config/
│   └── index.js              # Configurações centralizadas
├── services/
│   ├── geminiService.js      # Serviço do Gemini AI
│   └── tmdbService.js        # Serviço do TMDB
├── utils/
│   ├── validation.js         # Validações de entrada
│   └── response.js           # Respostas HTTP padronizadas
├── recommend.js              # Endpoint principal
└── movie.js                  # Endpoint de detalhes
```

**Princípios aplicados:**
- ✅ **Separation of Concerns** - Cada módulo tem uma responsabilidade única
- ✅ **DRY (Don't Repeat Yourself)** - Código reutilizável
- ✅ **Single Responsibility** - Serviços focados
- ✅ **Clean Code** - Código legível e documentado

---

## 🌐 PORTAS E URLs

### 🔧 Desenvolvimento Local

```bash
Frontend:  http://localhost:5173
Backend:   http://localhost:5173/api/*
```

**Importante:** Na Vercel (desenvolvimento local com `npm run dev`), o frontend e backend rodam na **MESMA PORTA** (5173).

O Vite faz proxy automático das requisições `/api/*` para as serverless functions.

### 📊 Como Fazer Requisições

**Em desenvolvimento:**
```javascript
// ✅ CORRETO - URL relativa
fetch('/api/recommend', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ texto: "Estou feliz!" })
});

// ❌ ERRADO - Não especifique porta
fetch('http://localhost:3000/api/recommend', ...)
```

**Em produção (Vercel):**
```javascript
// ✅ CORRETO - Mesma URL relativa funciona
fetch('/api/recommend', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ texto: "Estou feliz!" })
});
```

---

## 📋 APIs Necessárias (100% GRATUITAS!)

### 1. Google Gemini API Key

```
Custo: GRÁTIS ✅
Limite: 60 requisições/minuto
```

**Como obter:**
1. Acesse: https://makersuite.google.com/app/apikey
2. Clique em "Create API Key"
3. Cole no `.env` como `GEMINI_API_KEY`

### 2. TMDB API Key

```
Custo: GRÁTIS ✅
Limite: Ilimitado para uso pessoal
```

**Como obter:**
1. Acesse: https://www.themoviedb.org/
2. Crie conta gratuita
3. Settings > API > Request API Key (Developer)
4. Cole no `.env` como `TMDB_API_KEY`

---

## 🚀 Instalação e Uso

### 1. Instalar dependências

```bash
cd movie-sentiment-gemini
npm install
```

### 2. Configurar variáveis de ambiente

```bash
# Copiar template
cp .env.example .env

# Editar .env e adicionar as chaves:
# GEMINI_API_KEY=...
# TMDB_API_KEY=...
```

### 3. Rodar localmente

```bash
npm run dev
```

Acesse: **http://localhost:5173**

---

## 📡 Endpoints da API

### POST /api/recommend

Gera recomendações baseadas no sentimento.

**Request:**
```bash
curl -X POST http://localhost:5173/api/recommend \
  -H "Content-Type: application/json" \
  -d '{
    "texto": "Estou me sentindo meio desmotivada e queria algo inspirador"
  }'
```

**Response:**
```json
{
  "sucesso": true,
  "dados": {
    "textoAnalisado": "Estou me sentindo meio desmotivada...",
    "analiseEmocional": "Percebo que você está buscando inspiração...",
    "filmes": [
      {
        "id": 550,
        "titulo": "Clube da Luta",
        "motivoRecomendacao": "Este filme explora temas de...",
        "poster": "https://...",
        "nota": 8.4,
        "validado": true
      }
    ],
    "filmesValidados": 3,
    "geradoPorIA": true
  },
  "metadata": {
    "fontes": {
      "ia": "Google Gemini 1.5 Flash",
      "validacao": "TMDB (The Movie Database)"
    },
    "timestamp": "2025-02-19T..."
  }
}
```

### GET /api/movie?id=550

Retorna detalhes de um filme específico.

**Request:**
```bash
curl http://localhost:5173/api/movie?id=550
```

---

## 🧪 Testando as APIs

### Teste 1: Recomendação Básica

```javascript
const response = await fetch('/api/recommend', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ 
    texto: "Estou muito feliz hoje!" 
  })
});

const data = await response.json();
console.log(data);
```

### Teste 2: Detalhes do Filme

```javascript
const response = await fetch('/api/movie?id=550');
const data = await response.json();
console.log(data.dados.filme);
```

---

## 📁 Estrutura Completa do Projeto

```
movie-sentiment-gemini/
├── api/                           # 🔧 BACKEND
│   ├── config/
│   │   └── index.js              # Configurações centralizadas
│   ├── services/
│   │   ├── geminiService.js      # Lógica Gemini AI
│   │   └── tmdbService.js        # Lógica TMDB
│   ├── utils/
│   │   ├── validation.js         # Validações
│   │   └── response.js           # Respostas HTTP
│   ├── recommend.js              # POST /api/recommend
│   └── movie.js                  # GET /api/movie
│
├── src/                           # ⚛️ FRONTEND
│   ├── App.jsx                   # Componente principal
│   ├── App.css
│   ├── main.jsx
│   └── index.css
│
├── index.html
├── package.json
├── vite.config.js                # Config do Vite + Proxy
├── vercel.json                   # Config Vercel
├── .env.example                  # Template variáveis
├── .gitignore
└── README.md
```

---

## 🔧 Tecnologias

**Frontend:**
- React 18
- Vite 5
- CSS Vanilla

**Backend:**
- Node.js (Serverless Functions)
- Google Gemini 1.5 Flash (IA Gratuita)
- TMDB API (Validação de filmes)
- Axios (HTTP Client)

**Infraestrutura:**
- Vercel (Hosting + Serverless)

---

## 🌐 Deploy na Vercel

### Método 1: CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Adicionar variáveis de ambiente
vercel env add GEMINI_API_KEY
vercel env add TMDB_API_KEY
```

### Método 2: GitHub

1. Push para GitHub
2. Importar no Vercel Dashboard
3. Adicionar variáveis de ambiente:
   - `GEMINI_API_KEY`
   - `TMDB_API_KEY`
4. Deploy automático!

---

## 🐛 Troubleshooting

### Erro: "GEMINI_API_KEY não configurada"

```bash
# Verificar se o .env existe
ls -la .env

# Se não existir
cp .env.example .env
# Editar e adicionar as chaves
```

### Erro: "fetch failed" ou "ECONNREFUSED"

```bash
# Certifique-se de usar URL relativa
# ✅ CORRETO
fetch('/api/recommend', ...)

# ❌ ERRADO
fetch('http://localhost:3000/api/recommend', ...)
```

### Erro 429: "Quota exceeded" (Gemini)

```
Solução: Aguarde 1 minuto
Limite: 60 requisições/minuto (grátis)
```

### Backend não responde

```bash
# 1. Verificar se está rodando
npm run dev

# 2. Verificar porta
# Frontend e API na mesma porta: 5173

# 3. Testar endpoint diretamente
curl http://localhost:5173/api/recommend \
  -X POST \
  -H "Content-Type: application/json" \
  -d '{"texto":"teste"}'
```

---

## 📊 Limites das APIs Gratuitas

| API | Limite Grátis | Custo Extra |
|-----|---------------|-------------|
| **Gemini** | 60 req/min | Pago após upgrade |
| **TMDB** | Ilimitado | Sempre grátis |

---

## 💡 Boas Práticas Implementadas

### 1. **Configuração Centralizada**
```javascript
// api/config/index.js
const config = {
  gemini: { apiKey: process.env.GEMINI_API_KEY },
  tmdb: { apiKey: process.env.TMDB_API_KEY }
};
```

### 2. **Serviços Isolados**
```javascript
// Cada serviço cuida de uma API
geminiService.gerarRecomendacoes(texto);
tmdbService.validarRecomendacoes(filmes);
```

### 3. **Validação de Dados**
```javascript
// api/utils/validation.js
validarTextoSentimento(texto);
sanitizarTexto(texto);
```

### 4. **Respostas Padronizadas**
```javascript
// api/utils/response.js
respostaSucesso(res, dados);
erroBadRequest(res, mensagem);
```

---

## 📚 Documentação Adicional

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [TMDB API Docs](https://developers.themoviedb.org/3)
- [Vercel Serverless Functions](https://vercel.com/docs/functions)
- [Vite Proxy Configuration](https://vitejs.dev/config/server-options.html#server-proxy)

---

## 🎓 Aprenda Mais

### Por que essa arquitetura?

1. **Serviços separados** = fácil de testar
2. **Config centralizada** = fácil de modificar
3. **Utils reutilizáveis** = menos código duplicado
4. **Respostas padronizadas** = API consistente

### Próximos passos para melhorar:

- [ ] Adicionar testes unitários (Jest)
- [ ] Implementar cache (Redis)
- [ ] Adicionar rate limiting
- [ ] Logging estruturado (Winston)
- [ ] Monitoramento (Sentry)

---

## 📄 Licença

MIT - Use como quiser!

---

**Feito com ❤️ usando Gemini AI (100% gratuito!)** 🚀
