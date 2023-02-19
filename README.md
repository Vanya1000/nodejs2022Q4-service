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
Rename .env.example file to .env and you can set PORT (For convenience, I did not delete the .env file)
```
npm run docker
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Vulnerabilities scanning
After build images with command 'npm run docker' you can ran following commands:

Run scan image with application
```
npm run scan:app
```
Run scan image with postgreSQL image
```
npm run scan:db
```

## Running application without Docker
You should install all deps:
```
npm install
```

## Testing

For run tests into container run without npm install:
```
npm run testsIntoContainer
```

If you want run tests without container you should at first install all dependencies see above

After application running open new terminal and enter:

To run all tests 

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```