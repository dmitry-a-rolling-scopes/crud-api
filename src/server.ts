import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import dotenv from 'dotenv';
import { HttpContentType } from './enums/http.content-type.enum';
import { HttpHeader } from './enums/http.header.enum';
import { ServerUtils } from './utils/utils.server';
import { HttpMethod } from './enums/http.method.enum';
import { UserGenerator } from './utils/utils.user.generator';
import { Validator } from './utils/utils.validator';
import { ResponseUtils } from './utils/utils.response';
import { UserFactory } from './utils/utils.user.factory';

dotenv.config();

const userCount = 3;
let users = UserGenerator.generateUsers(userCount);

const server = createServer(
  (request: IncomingMessage, response: ServerResponse) => {
    response.setHeader(
      HttpHeader.CONTENT_TYPE,
      HttpContentType.APPLICATION_JSON,
    );

    const parsedUrl = ServerUtils.getUrl(request);

    if (!parsedUrl.pathname.startsWith('/api/users')) {
      return ResponseUtils.notFoundResponse(response);
    }

    const method = ServerUtils.getMethod(request);

    const supportedMethods = [
      HttpMethod.GET,
      HttpMethod.POST,
      HttpMethod.PUT,
      HttpMethod.DELETE,
    ];

    if (!supportedMethods.includes(method)) {
      return ResponseUtils.methodNotAllowedResponse(response);
    }

    const route = parsedUrl.pathname.split('/').slice(1);

    if (route.length === 2) {
      if (method === HttpMethod.GET) {
        if (route[1] === 'users') {
          return ResponseUtils.okResponse(response, users);
        }

        return ResponseUtils.notFoundResponse(response);
      }

      if (method === HttpMethod.POST) {
        let body: string = '';

        request.on('data', (chunk) => {
          body += chunk;
        });

        request.on('end', () => {
          try {
            const data = JSON.parse(body);
            const { username, age, hobbies } = data;

            if (!Validator.isUserDataValid(username, age, hobbies)) {
              return ResponseUtils.badRequestResponse(response);
            }

            const user = UserFactory.create(username, age, hobbies);

            users.push(user);

            return ResponseUtils.createdResponse(response, user);
          } catch (error) {
            console.log(error);

            return ResponseUtils.badRequestResponse(response);
          }
        });
      }
    }

    if (route.length === 3) {
      const userId = route[2];

      if (!Validator.isUuidV4(userId)) {
        return ResponseUtils.badRequestResponse(response);
      }

      const user = users.find((user) => user.id === userId);

      if (!user) {
        return ResponseUtils.notFoundResponse(response);
      }

      if (method === HttpMethod.GET) {
        return ResponseUtils.okResponse(response, user);
      }

      if (method === HttpMethod.PUT) {
        let body: string = '';

        request.on('data', (chunk) => {
          body += chunk;
        });

        request.on('end', () => {
          try {
            const data = JSON.parse(body);
            const { username, age, hobbies } = data;

            if (!Validator.isUserDataValid(username, age, hobbies)) {
              return ResponseUtils.badRequestResponse(response);
            }

            for (const user of users) {
              if (user.id !== userId) {
                continue;
              }

              user.age = age;
              user.hobbies = hobbies;
              user.username = username;
            }

            return ResponseUtils.okResponse(response, user);
          } catch (error) {
            console.log(error);

            return ResponseUtils.badRequestResponse(response);
          }
        });

        return;
      }

      if (method === HttpMethod.DELETE) {
        users = users.filter((user) => user.id !== userId);

        return ResponseUtils.noContentResponse(response);
      }
    }
  },
);

server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});
