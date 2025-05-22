# CRUD API

## Usage

### Run Application

```bash

npm run start:prod
```

### API Reference

- **GET** `api/users` is used to get all persons
  - Server will answer with `status code` **200** and all users records
    ```bash
    curl --request GET 'http://localhost:3000/api/users'
    ```
- **GET** `api/users/{userId}`
  - Server will answer with `status code` **200** and record with `id === userId` if it exists
  - Server will answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server will answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    ```bash
    curl --request GET 'http://localhost:3000/api/users/8e8aa411-8208-4be1-92f8-eeeada824678'
    ```

- **POST** `api/users` is used to create record about new user and store it in database
  - Server will answer with `status code` **201** and newly created record
  - Server will answer with `status code` **400** and corresponding message if request `body` does not contain **required** fields
    ```bash
    curl --location --request POST 'http://localhost:3000/api/users' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "username": "username",
        "age": 100,
        "hobbies": ["Hobby 1", "Hobby 2"]
    }'
    ```

- **PUT** `api/users/{userId}` is used to update existing user
  - Server will answer with` status code` **200** and updated record
  - Server will answer with` status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server will answer with` status code` **404** and corresponding message if record with `id === userId` doesn't exist
    ```bash
    curl --location --request PUT 'http://localhost:3000/api/users/8e8aa411-8208-4be1-92f8-eeeada824678' \
    --header 'Content-Type: application/json' \
    --data-raw '{
      "username": "username",
      "age": 100,
      "hobbies": ["Hobby 1", "Hobby 2"]
    }'
    ```

- **DELETE** `api/users/{userId}` is used to delete existing user from database
  - Server will answer with `status code` **204** if the record is found and deleted
  - Server will answer with `status code` **400** and corresponding message if `userId` is invalid (not `uuid`)
  - Server will answer with `status code` **404** and corresponding message if record with `id === userId` doesn't exist
    ```bash
    curl --location --request DELETE 'http://localhost:3000/api/users/8e8aa411-8208-4be1-92f8-eeeada824678'
    ```
