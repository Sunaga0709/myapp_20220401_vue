FROM node:14.15.0-alpine

ENV TZ Asia/Tokyo

RUN mkdir app
WORKDIR /app

COPY . /app

RUN apk update && \
    npm install && \
    npm install -g npm && \
    npm install -g @vue/cli@4.5.3

EXPOSE 8080

CMD ["npm", "run", "serve"]
