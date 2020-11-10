FROM node:14.15-alpine3.12

RUN mkdir /app
WORKDIR /app

COPY package.json package-lock.json /app/
RUN npm -q install --only=prod && npm -q cache clean --force

COPY components /app/components
COPY pages /app/pages
COPY public /app/public
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
