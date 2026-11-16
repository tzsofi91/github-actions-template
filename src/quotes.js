const MAX_LENGTH = 80;

const SEED = [
  "It works on my machine.",
  "Have you tried turning it off and on again?",
  "There is no cloud, just someone else's computer.",
  "There is no cloud, just someone else's computer2.",
  "There is no cloud, just someone else's computer3.",
];

function validateQuote(text) {
  if (typeof text !== "string" || text.trim() === "") {
    return "text is required";
  }
  if (text.length > MAX_LENGTH) {
    return `text must be at most ${MAX_LENGTH} characters (got ${text.length})`;
  }
  return null;
}

function createQuoteStore(seed = SEED) {
  const quotes = seed.map((text, i) => ({ id: i + 1, text }));

  return {
    all: () => quotes,
    random: () => quotes[Math.floor(Math.random() * quotes.length)],
    add(text) {
      const quote = { id: quotes.length + 1, text: text.trim() };
      quotes.push(quote);
      return quote;
    },
  };
}

module.exports = { MAX_LENGTH, SEED, validateQuote, createQuoteStore };
