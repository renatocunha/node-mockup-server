FROM node

WORKDIR /mockup-server

COPY . /mockup-server

RUN npm install

EXPOSE 9000

ENTRYPOINT node src/index.js
