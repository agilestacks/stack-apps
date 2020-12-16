FROM node:14.15-alpine3.12

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm -q install --only=prod && npm -q cache clean --force

ARG NPM_SCRIPT="start"
ENV NPM_SCRIPT $NPM_SCRIPT

COPY database.json /app/database.json
COPY components /app/components
COPY migrations /app/migrations
COPY lib /app/lib
COPY pages /app/pages
COPY public /app/public

RUN if [ "$NPM_SCRIPT" = "start" ] ; then npm run build ; fi

EXPOSE 3000

CMD npm run $NPM_SCRIPT