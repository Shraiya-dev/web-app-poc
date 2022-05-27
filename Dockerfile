FROM node:lts-alpine as build-stage

ARG NEXT_PUBLIC_APP_ENV

ENV NEXT_PUBLIC_APP_ENV ${NEXT_PUBLIC_APP_ENV}

ENV APP_HOME=/usr/src/app
RUN mkdir -p $APP_HOME
COPY . $APP_HOME
RUN cd $APP_HOME && npm ci
WORKDIR $APP_HOME
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
