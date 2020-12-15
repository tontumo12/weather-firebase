FROM node:12.16.3-alpine3.9

RUN mkdir -p /var/www/weather-front
WORKDIR /var/www/weather-front

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 1105

ENV NUXT_HOST=0.0.0.0

ENV NUXT_PORT=1105

CMD [ "npm", "start" ]