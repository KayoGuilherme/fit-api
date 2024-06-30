FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

COPY ./src .

COPY . .

RUN npm install --quiet --no-optional --no-found --loglevel=error

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]

