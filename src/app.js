const express = require("express");
const { validateQuote, createQuoteStore } = require("./quotes");

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

function createApp({ store = createQuoteStore(), version = "dev" } = {}) {
  const app = express();
  app.use(express.json());

  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.get("/version", (req, res) => {
    res.json({ version });
  });

  app.get("/api/quotes", (req, res) => {
    res.json(store.all());
  });

  app.get("/api/quotes/random", (req, res) => {
    res.json(store.random());
  });

  app.post("/api/quotes", (req, res) => {
    const error = validateQuote(req.body?.text);
    if (error) {
      return res.status(400).json({ error });
    }
    res.status(201).json(store.add(req.body.text));
  });

  app.get("/", (req, res) => {
    res.send(`<h1>${escapeHtml(store.random().text)}</h1>`);
  });

  return app;
}

module.exports = { createApp };
