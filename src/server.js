const { createApp } = require("./app");

const PORT = Number(process.env.PORT) || 3000;
const VERSION = process.env.GIT_SHA || "dev";

const server = createApp({ version: VERSION }).listen(PORT, () => {
  console.log(`Quotes ${VERSION} listening on port ${PORT}`);
});

// In a container, node runs as PID 1 and ignores SIGTERM unless we handle it.
process.on("SIGTERM", () => {
  console.log("SIGTERM received, shutting down");
  server.close(() => process.exit(0));
});
