import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../error/request-validation-error';

export const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    throw new RequestValidationError(err.array());
  }
  next();
};
