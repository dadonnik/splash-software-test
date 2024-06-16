ARG NODE_VERSION
FROM node:${NODE_VERSION} as development

RUN apt-get update && apt-get install -y git

USER node

WORKDIR /usr/src/app

COPY --chown=node:node src/package.json ./
COPY --chown=node:node src/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY --chown=node:node ./src .