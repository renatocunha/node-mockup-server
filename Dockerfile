FROM node

WORKDIR /mockup-server

COPY . /mockup-server

RUN npm install
RUN tsc -p /mockup-server/
EXPOSE 9000

ENTRYPOINT node src/index.js
