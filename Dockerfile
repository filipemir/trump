FROM node:boron

RUN mkdir -p /usr/src/app

COPY . /usr/src/app

WORKDIR usr/src/app
RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]