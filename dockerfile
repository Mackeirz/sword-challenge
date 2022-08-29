FROM node:latest

COPY . /usr/src/sword-challenge

WORKDIR /usr/src/sword-challenge

RUN npm install nodemon -g

RUN echo "#!/bin/sh" >> /usr/src/docker-entrypoint.sh \
    && echo "" >> /usr/src/docker-entrypoint.sh \
    && echo "cd /usr/src/sword-challenge" >> /usr/src/docker-entrypoint.sh \
    && echo "npm install" >> /usr/src/docker-entrypoint.sh \
    && echo "npm run db:migrate" >> /usr/src/docker-entrypoint.sh \
    && echo "npm run db:seed:all" >> /usr/src/docker-entrypoint.sh \
    && echo "npm run start:development" >> /usr/src/docker-entrypoint.sh
RUN chmod +x /usr/src/docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT [ "/usr/src/docker-entrypoint.sh" ]