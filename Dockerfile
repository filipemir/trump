FROM node:8.2.0-alpine

# Install dependencies first to cache image:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install --production

# Create app folder and copy node modules over
RUN mkdir -p /usr/src/app
RUN cp -a /tmp/node_modules /usr/src/app/

WORKDIR usr/src/app

# Copy remaining files over to work dir
ADD . /usr/src/app

EXPOSE 3000

# Used by server determine whether the db is in mongodb or localhost:
ENV IS_DOCKER=true

CMD ["npm", "start"]