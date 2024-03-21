FROM node

WORKDIR /usr/src/app

ENV HOST 0.0.0.0

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "dev"]