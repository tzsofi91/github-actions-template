const { test, before, after } = require("node:test");
const assert = require("node:assert/strict");
const { createApp } = require("../src/app");

let server;
let baseUrl;

before(async () => {
  server = createApp({ version: "test-sha" }).listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://localhost:${server.address().port}`;
});

after(() => {
  server.closeAllConnections();
  server.close();
});

test("GET /health says ok", async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { status: "ok" });
});

test("GET /version returns the version the app was started with", async () => {
  const res = await fetch(`${baseUrl}/version`);
  assert.deepEqual(await res.json(), { version: "test-sha" });
});

test("GET /api/quotes returns the quotes", async () => {
  const res = await fetch(`${baseUrl}/api/quotes`);
  const quotes = await res.json();
  assert.equal(res.status, 200);
  assert.ok(quotes.length > 0);
});

test("POST /api/quotes adds a valid quote", async () => {
  const res = await fetch(`${baseUrl}/api/quotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: "Ship small, ship often." }),
  });
  assert.equal(res.status, 201);
  assert.equal((await res.json()).text, "Ship small, ship often.");
});

test("POST /api/quotes rejects a quote that is too long", async () => {
  const res = await fetch(`${baseUrl}/api/quotes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: "x".repeat(200) }),
  });
  assert.equal(res.status, 400);
});
