import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../error/custom-error';

export const errorHander = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log(err);
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ error: err.serializeErrors() });
  }
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
};
