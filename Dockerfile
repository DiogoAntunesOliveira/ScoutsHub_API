FROM node:14

WORKDIR  /scoutshub

COPY scoutshub/package*.json ./

RUN npm install

COPY scoutshub/. ./

CMD ["node", "index.js"]
