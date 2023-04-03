FROM node:14

WORKDIR $PWD

COPY package*.json ./

RUN npm install

COPY .dockerignore ./
COPY . . 

EXPOSE 3000

CMD ["npm", "start"]