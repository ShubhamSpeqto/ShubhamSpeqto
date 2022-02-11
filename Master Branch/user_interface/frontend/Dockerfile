FROM node:10.16.3-stretch as intermediate
LABEL maintainer="amarnath.arora@oodlestechnologies.com"
WORKDIR /opt/app/
COPY package*.json ./
RUN npm install
COPY . .
RUN ./node_modules/@angular/cli/bin/ng build --output-path=/opt/app/dist
FROM nginx:1.16.1-alpine
RUN rm -rf /etc/nginx/conf.d/*
COPY user.conf /etc/nginx/conf.d/
COPY --from=intermediate /opt/app/dist/ /var/app/html