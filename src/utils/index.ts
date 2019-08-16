import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

import { logger } from '../app';

dotenv.config();

const { NODE_ENV } = process.env;

interface error {
  error: Error;
}

export function catchErrors(fn: (req: Request, res: Response, next: NextFunction) => any) {
  return function (req: Request, res: Response, next: NextFunction) {
    return fn(req, res, next).catch((error: error) => {
      if (NODE_ENV !== 'production') {
        console.error(error);
      } else {
        logger.error(error);
      }
      next();
    });
  };
};
