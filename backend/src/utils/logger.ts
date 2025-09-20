import winston from 'winston';

const logLevels = {
  emerg: 0,
  alert: 1,
  crit: 2,
  error: 3,
  warn: 4,
  notice: 5,
  info: 6,
  debug: 7
}
const logColors = {
  emerg: 'red',
  alert: 'red',
  crit: 'pink',
  error: 'red',
  warn: 'yellow',
  notice: 'gray',
  info: 'cyan',
  debug: 'green'
};
winston.addColors(logColors);

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize({ all: true }),
  winston.format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
);

const logger = winston.createLogger({
  levels: logLevels,

  format: logFormat,

  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',

  transports: [new winston.transports.Console()],

  exitOnError: false,
});

interface LoggerStream {
  write(message: string): void;
}

(logger as any).stream = {
  write: function (message: string) {
    logger.info(message.trim());
  },
} as LoggerStream;

export default logger;
