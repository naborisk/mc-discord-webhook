FROM node:18.19
COPY ./index.js /app/index.js
COPY ./package.json /app/package.json
WORKDIR /app
RUN npm install
ENTRYPOINT ["node", "index.js"]
