import { HttpStatus } from './enums/http.status.enum';
import { HttpErrorMessage } from './enums/http.error.message.enum';

export interface ErrorResponse {
  message: HttpErrorMessage;
  status: HttpStatus;
}
