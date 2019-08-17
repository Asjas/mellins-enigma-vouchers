FROM node:12.8.1-stretch-slim
ENV NODE_ENV=production

RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json yarn.lock ./
RUN yarn && yarn cache clean
COPY --chown=node:node . .
RUN npm build

EXPOSE 3000

CMD [ "node", "build/start.js" ]
