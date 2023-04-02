FROM node:14

WORKDIR $PWD

COPY package*.json ./

RUN npm install

COPY . . 
COPY .dockerignore ./

EXPOSE 3000

CMD ["npm", "start"]