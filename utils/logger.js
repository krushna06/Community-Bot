const { createLogger, format, transports } = require('winston');
const chalk = require('chalk');
const moment = require('moment-timezone');

const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.printf(({ timestamp, level, message }) => {
            const istTimestamp = moment(timestamp).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
            return `${chalk.green(istTimestamp)} | bot_0 | ${chalk.cyan(level.toUpperCase().padEnd(8))} | ${chalk.white(message)}`;
        })
    ),
    transports: [
        new transports.Console(),
    ],
});

module.exports = logger;
