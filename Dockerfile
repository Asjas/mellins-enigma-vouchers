FROM node:12.8.1

EXPOSE 3000

ENV NODE_ENV="production"
ENV PORT=3000
ENV ENIGMA_URL="https://enigma-api.encentivize.co.za"
ENV ENIGMA_TENANT="mellins"
ENV ENIGMA_USERNAME="dawidp@pienaarpartners.co.za"
ENV ENIGMA_PASSWORD="Enigma@007"
ENV SMTP_HOST="smtp.mellins.co.za"
ENV SMTP_PORT=587
ENV MAIL_USER="vouchers"
ENV MAIL_PASS="7aqwfUvr6Jeh"
ENV MYSQL_HOST="db"
ENV MYSQL_PORT=3306
ENV MYSQL_DATABASE="enigma"
ENV MYSQL_USERNAME="vouchers"
ENV MYSQL_PASSWORD="abz8rx9f"

# Create work environment and set up app
RUN mkdir /app && chown -R node:node /app
WORKDIR /app
USER node
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --production && yarn cache clean
COPY --chown=node:node . .

RUN yarn build

CMD [ "node", "dist/main.js" ]
