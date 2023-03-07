FROM node:16-alpine as deps
WORKDIR /tmp
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build
RUN yarn install --production --ignore-scripts --prefer-offline
RUN mv out /home/node && mv node_modules /home/node

FROM node:16-alpine as prod
COPY --from=deps /home/node /home/node
WORKDIR /home/node/out
EXPOSE 3000
CMD ["node", "app.js"]
