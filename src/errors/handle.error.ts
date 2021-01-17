import { Application, NextFunction, Request, Response } from 'express';

import { NOT_FOUND } from '../constants';

import { BaseError } from './base.error';

export const handleNotFound = (app: Application) => {
  app.use((req: Request, res: Response) => {
    res.status(404).json(NOT_FOUND);
  });
};

export const handleError = (app: Application) => {
  app.use(
    (error: BaseError, req: Request, res: Response, next: NextFunction) => {
      res
        .status(error.status || 500)
        .json({ error: error.message, status: error.status || 500 });
    }
  );
};
