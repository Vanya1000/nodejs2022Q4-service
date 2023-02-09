FROM node:18.14.0-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install && npm cache clean --force
COPY . .
CMD [ "npm", "run", "start:dev" ]