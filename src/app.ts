import * as bodyparser from 'body-parser';
import * as dotenv from 'dotenv';
import * as winston from 'winston';
import DailyRotateFile from "winston-daily-rotate-file";
import cors from 'cors';
import express from 'express';
import expresswinstonlogger from 'express-winston'
import helmet from 'helmet';
import morgan from "morgan";

import { router } from "./router";

dotenv.config();

const { NODE_ENV } = process.env;
const app = express();
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new DailyRotateFile({
      filename: "server.log",
      dirname: "logs",
      frequency: '24h',
      zippedArchive: true,
      maxFiles: '30d'
    }),
    new winston.transports.File({ filename: 'error.log', dirname: "logs", level: 'error', maxsize: 5242880, maxFiles: 5 }),
  ]
})

// Express.js development middleware (console)
if (NODE_ENV !== 'production') {
  app.use(morgan(':method :url :status :response-time ms'))
}

// Express production logging (winston)
if (NODE_ENV === 'production') {
  app.use(expresswinstonlogger.logger(logger));
}

// Express header middleware
app.use(helmet({ hidePoweredBy: true }))

// Express cors middleware
app.use(cors({
  origin: "http://mellins.co.za",
  // methods: "GET, POST",
  optionsSuccessStatus: 200
}))

// Express body parser
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

// Expose our routes
app.use('/', router);

// 404 route handler
app.use(function (req, res, next) {
  res.status(404).send({ error: "💥 Route does not exist!" });
  next();
})

export default app;
