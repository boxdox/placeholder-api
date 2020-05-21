FROM node:12.16.3-alpine

WORKDIR /app

COPY . /app

RUN yarn && yarn build

EXPOSE $PORT

CMD ["yarn", "start"]