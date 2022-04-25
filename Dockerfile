FROM node:lts-alpine as build-stage

ARG NEXT_PUBLIC_SERVER_URL_VAR

ENV NEXT_PUBLIC_SERVER_URL ${NEXT_PUBLIC_SERVER_URL_VAR}

ENV APP_HOME=/usr/src/app
RUN mkdir -p $APP_HOME
COPY . $APP_HOME
RUN cd $APP_HOME && npm ci
WORKDIR $APP_HOME
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
