# 🎬 CineMood

Durante as férias da faculdade, percebi que passava mais tempo escolhendo filmes do que assistindo. 
Resolvi criar uma ferramenta que recomenda filmes com base no seu humor, usando IA e validação de dados reais.

CineMood é uma aplicação fullstack que utiliza **Google Gemini (plano gratuito)** para interpretar sentimentos e recomendar filmes, validando os resultados com dados da **TMDB API**.  
O deploy em produção é feito via **Vercel (Serverless Functions)**.

---

# 🏗️ Arquitetura

```
api/
├── config/
│   └── index.js
├── services/
│   ├── geminiService.js
│   └── tmdbService.js
├── utils/
│   ├── validation.js
│   └── response.js
├── recommend.js
└── movie.js
```

### Princípios aplicados

* Separation of Concerns
* Single Responsibility
* DRY
* Padronização de respostas HTTP
* Configuração centralizada via variáveis de ambiente

---

# 🌐 Desenvolvimento Local

Este projeto utiliza **Vercel Serverless Functions**.

Para rodar localmente corretamente (simulando produção), utilize:

```bash
vercel dev
```

Isso executa:

* Frontend (Vite)
* Backend (funções em `/api`)
* Tudo na mesma origem

Por padrão:

```
http://localhost:3000
```

As rotas `/api/*` são resolvidas automaticamente pelo Vercel.

> Não é necessário configurar proxy manual no Vite quando usando `vercel dev`.

---

# 🔑 Variáveis de Ambiente

Crie um `.env` baseado em `.env.example`:

```bash
cp .env.example .env
```

Adicione:

```
GEMINI_API_KEY=
TMDB_API_KEY=
```

---

# 📡 Endpoints

## POST `/api/recommend`

Gera recomendações com base no texto enviado.

```bash
curl -X POST http://localhost:3000/api/recommend \
  -H "Content-Type: application/json" \
  -d '{"texto":"Estou desmotivada e queria algo inspirador"}'
```

---

## GET `/api/movie?id=550`

Retorna detalhes de um filme específico.

```bash
curl http://localhost:3000/api/movie?id=550
```

---

# ⚙️ Tecnologias

### Frontend

* React 18
* Vite

### Backend

* Node.js (Vercel Serverless Functions)
* Google Gemini 2.5 Flash
* TMDB API
* Axios

### Infraestrutura

* Vercel (Deploy + Functions)
* Vercel CLI (`vercel dev` para ambiente local)

---

# 🚀 Deploy

## Via CLI

```bash
vercel
```

Configure as variáveis:

```bash
vercel env add GEMINI_API_KEY
vercel env add TMDB_API_KEY
```

## Via GitHub

1. Push do projeto
2. Importar no Vercel
3. Configurar variáveis no dashboard
4. Deploy automático a cada push

---

# 📊 Limites das APIs (Plano Gratuito)

| API    | Limite                          |
| ------ | ------------------------------- |
| Gemini | 60 req/min                      |
| TMDB   | Uso gratuito para desenvolvedor |

---

# 🧠 Decisões Arquiteturais

* Serviços isolados para cada API externa
* Camada de validação antes de chamar IA
* Padronização de respostas
* Backend desacoplado do frontend
* Estrutura preparada para evoluir com:

  * Testes automatizados
  * Cache
  * Rate limiting
  * Observabilidade

---

# 📄 Licença

MIT