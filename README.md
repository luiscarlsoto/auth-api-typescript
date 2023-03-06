# Authentication API with TypeScript

This is an authentication API built with TypeScript. It allows users to register, login, and authenticate with JWT tokens.

## Technologies Used
- TypeScript
- Node.js
- Express
- JWT
- bcrypt

## Getting Started
1. Clone the repository:
    ```
    git clone https://github.com/luiscarlsoto/auth-api-typescript.git
    ```
2. Install dependencies: `npm install.`
3. Set up environment variables:
    - Create a `.env` file at the root of the project.
    - Add the following variables to the `.env` file:
    ```
    # DB CONFIG
    DB_HOST = localhost
    DB_USER = root
    DB_NAME = todo-api
    PORT = 3366

    # AUTH TOKENS
    JWT_SECRET = SECRETPASSWORD
    JWT_EXP_DAYS = 1
    ```
4. Start the server: `npm run start`

## Endpoints
### Create a new user
#### Request

``post - api/auth/singup``
##### body
```javascript


{
  "email": String,
  "password": String,
}

```
###### Response
```javascript 

{
  "status": {
    "key": "auth.signin.success",
    "type": "success"
  },
  "token": "your-token"
}
```
### Login with a user
``post - api/auth/signin``
##### body
```javascript
// Content-Type: application/json

{
  "email": String,
  "password": String,
  "rememberMe": Boolean
}
```
###### Response
```javascript 

{
  "status": {
    "key": "auth.signin.success",
    "type": "success"
  },
  "token": "your-token"
}
```

### License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.