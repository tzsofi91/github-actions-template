# Quotes

A small JSON API that serves developer quotes.

## Endpoints

| Method | Path | What it does |
|---|---|---|
| `GET` | `/` | A random quote as an HTML page |
| `GET` | `/health` | `{"status":"ok"}` when the app is up |
| `GET` | `/version` | The commit the image was built from (`dev` locally) |
| `GET` | `/api/quotes` | All quotes |
| `GET` | `/api/quotes/random` | One random quote |
| `POST` | `/api/quotes` | Add a quote: `{"text": "..."}`, at most 80 characters |

Quotes are kept in memory, so a restart resets them.

## Configuration

| Variable | Default | Meaning |
|---|---|---|
| `PORT` | `3000` | Port the app listens on |
| `GIT_SHA` | `dev` | Version shown by `/version`. Set at image build time. |

See `.env.example`.

## Run with Docker

```bash
docker build --build-arg GIT_SHA=local -t quotes .
docker run --rm -p 3000:3000 quotes
```

Then try:

```bash
curl localhost:3000/health
curl localhost:3000/version
curl localhost:3000/api/quotes
curl -X POST -H "Content-Type: application/json" -d '{"text":"Ship small, ship often."}' localhost:3000/api/quotes
```

## Run with Node.js (22)

```bash
npm ci
npm start
```

## Test

```bash
npm test
```

Unit tests for the quote rules are in `test/quotes.test.js`, API tests in
`test/api.test.js`.
