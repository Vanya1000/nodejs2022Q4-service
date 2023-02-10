# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/)

## Downloading

```
git clone https://github.com/Vanya1000/nodejs2022Q4-service
```

## Select branch

```
git checkout docker_orm
```

## Running application with Docker
Rename .env.example file to .env and you can set PORT
```
npm run docker
```

## Vulnerabilities scanning

```
npm run scan
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.








<!-- ## Other variants running application

Build application
```
npm run build
```

Run dev mode
```
npm start:dev
```



## Testing

After application running open new terminal and enter:

To run all tests 

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```


To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```
 -->