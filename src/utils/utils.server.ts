import { IncomingMessage } from 'node:http';
import { URL } from 'node:url';
import { HttpStatus } from '../enums/http.status.enum';
import { HttpMethod } from '../enums/http.method.enum';
import { ErrorResponse } from '../response.error.interface';
import { HttpErrorMessage } from '../enums/http.error.message.enum';

export class ServerUtils {
  public static getUrl(request: IncomingMessage): URL {
    return new URL(request?.url || '', 'http://localhost/');
  }

  public static getMethod(request: IncomingMessage): HttpMethod {
    return (request.method as HttpMethod) || HttpMethod.GET;
  }

  public static getErrorResponse(status: HttpStatus): ErrorResponse {
    let message: HttpErrorMessage;

    switch (status) {
      case HttpStatus.BAD_REQUEST:
        message = HttpErrorMessage.BAD_REQUEST;
        break;
      case HttpStatus.METHOD_NOT_ALLOWED:
        message = HttpErrorMessage.METHOD_NOT_ALLOWED;
        break;
      case HttpStatus.NOT_FOUND:
        message = HttpErrorMessage.NOT_FOUND;
        break;
      default:
        message = HttpErrorMessage.INTERNAL_SERVER_ERROR;
    }

    return { message: message, status: status };
  }
}
