const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            return `${timestamp} | bot_0 | ${level.toUpperCase().padEnd(8)} | ${message}`;
        })
    ),
    transports: [
        new transports.Console(),
    ],
});

module.exports = logger;
