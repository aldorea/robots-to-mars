import { BaseError } from './base.error';

export class DataError extends BaseError {
  constructor(message?: string) {
    super(message || 'Please chech the syntax of the instructions', 400);
  }
}
