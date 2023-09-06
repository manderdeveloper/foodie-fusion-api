import { AppError } from "./AppError";

export class InvalidAppError extends AppError {
    constructor(message: string) {
      super(message, 404, 'Invalid argument');
  }
}