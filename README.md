# Login API

This is a basic login api made in typescript

## Installation

Use the package manager [NPM](https://www.npmjs.com) to install the dependencies.

```bash
npm install
```
To start the api server use

```bash
npm run start
```

## Usage

```bash
POST '/api/signup'
```
```javascript
// body
{
  "email": String,
  "password": String
}
```

```javascript
// response
{
  "token": String
}
```


## Contributing

-

## License

[MIT](https://choosealicense.com/licenses/mit/)