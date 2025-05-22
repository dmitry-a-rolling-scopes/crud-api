import { ServerResponse } from 'node:http';
import { HttpStatus } from '../enums/http.status.enum';
import { ServerUtils } from './utils.server';
import { User } from '../user.interface';

export class ResponseUtils {
  public static badRequestResponse = (response: ServerResponse) => {
    response.statusCode = HttpStatus.BAD_REQUEST;
    response.end(
      JSON.stringify(ServerUtils.getErrorResponse(HttpStatus.BAD_REQUEST)),
    );
  };

  public static createdResponse = (response: ServerResponse, user: User) => {
    response.statusCode = HttpStatus.CREATED;
    response.end(JSON.stringify(user));
  };

  public static methodNotAllowedResponse = (response: ServerResponse) => {
    response.statusCode = HttpStatus.METHOD_NOT_ALLOWED;
    response.end(
      JSON.stringify(
        ServerUtils.getErrorResponse(HttpStatus.METHOD_NOT_ALLOWED),
      ),
    );
  };

  public static noContentResponse = (response: ServerResponse) => {
    response.statusCode = HttpStatus.NO_CONTENT;
    response.end();
  };

  public static notFoundResponse = (response: ServerResponse) => {
    response.statusCode = HttpStatus.NOT_FOUND;
    response.end(
      JSON.stringify(ServerUtils.getErrorResponse(HttpStatus.NOT_FOUND)),
    );
  };

  public static okResponse = (
    response: ServerResponse,
    data: User | User[],
  ) => {
    response.statusCode = HttpStatus.OK;
    response.end(JSON.stringify(data));
  };
}
