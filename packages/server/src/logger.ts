import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  format: format.combine(
    format.colorize(),
    format.errors({ stack: true }),
    format.timestamp({
      format: 'DD-MM-YYYY, HH:MM',
    }),
    format.printf(
      (info) => `${info.level} [${info.timestamp}]: ${info.message}`
    )
  ),
  transports: [new transports.Console()],
});

export default logger;
