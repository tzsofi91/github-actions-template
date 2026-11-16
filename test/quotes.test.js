const { test } = require("node:test");
const assert = require("node:assert/strict");
const { SEED, MAX_LENGTH, validateQuote } = require("../src/quotes");

test("every seed quote is valid", () => {
  for (const text of SEED) {
    assert.equal(validateQuote(text), null, `"${text}"`);
  }
});

test("a quote longer than the limit is rejected", () => {
  assert.notEqual(validateQuote("x".repeat(MAX_LENGTH + 1)), null);
});

test("an empty quote is rejected", () => {
  assert.notEqual(validateQuote("   "), null);
});
