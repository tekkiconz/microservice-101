import { ValidationError } from 'express-validator';
import { CustomError } from './custom-error';

export class RequestValidationError extends CustomError {
  statusCode = 400;
  public errors: ValidationError[];
  constructor(errors: ValidationError[]) {
    super('Invalid request parameters');

    // Extend a built in class
    Object.setPrototypeOf(this, RequestValidationError.prototype);
    this.errors = errors;
  }
  serializeErrors() {
    return this.errors.map((err) => {
      return { message: err.msg, field: err.param };
    });
  }
}
