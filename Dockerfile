FROM node:12.13.0

EXPOSE 3000

ENV NODE_ENV="production"

# Create work environment and set up app
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --production && yarn cache clean
COPY --chown=node:node . .

RUN yarn build

CMD [ "node", "dist/main.js" ]
