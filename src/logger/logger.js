// src/logger/logger.js
import pino from "pino";

const logger = pino({
  browser: {
    serialize: true,
    asObject: true,
    transmit: {
      send: (level, logEvent) => {
        console.log(`[${level.toUpperCase()}]`, logEvent.messages);
      },
    },
  },
});

export default logger;
