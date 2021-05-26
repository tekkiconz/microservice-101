import { CustomError } from './custom-error';

export class NotAuthorizeError extends CustomError {
  statusCode = 401;

  constructor() {
    super('Not Authorize');

    Object.setPrototypeOf(this, NotAuthorizeError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Not authorize' }];
  }
}
