import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

import { logger } from '../app';

dotenv.config();

const { NODE_ENV } = process.env;

interface Error {
  error: Error;
}

export function catchErrors(fn: (req: Request, res: Response, next: NextFunction) => any) {
  return function(req: Request, res: Response, next: NextFunction): any {
    return fn(req, res, next).catch((error: Error) => {
      if (NODE_ENV !== 'production') {
        console.error(error);
      } else {
        logger.error(error);
      }
      next(error);
    });
  };
}
