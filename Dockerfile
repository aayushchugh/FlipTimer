FROM node:23-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . /app

RUN npm run build

EXPOSE 3002

CMD ["npm", "start"]