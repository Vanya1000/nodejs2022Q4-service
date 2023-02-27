# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Docker - [Download & Install Docker](https://www.docker.com/)

## Downloading

```
git clone https://github.com/Vanya1000/nodejs2022Q4-service
```

```
cd nodejs2022Q4-service
```

## Select branch

```
git checkout auth_log
```

## Install all dependencies
```
npm install
```

## Running application with Docker
Rename .env.example file to .env and you can set PORT (For convenience, I did not delete the .env file)
```
npm run docker
```


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

## Testing

To run all auth tests 

```
npm run test:auth
```
