FROM node:16-alpine

WORKDIR /src/backend

COPY package*.json ./

RUN npm install
COPY . .

EXPOSE 8000
CMD [ "npm", "run", "dev" ]