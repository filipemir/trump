### Local Development
You can develop the site locally with or without docker.

## Docker development
* Install [Docker Community Edition](https://docs.docker.com/engine/installation/). Ensure your installation includes
the Docker engine and Docker Compose
* Run `docker-compose up --build`

That's it. Should find the site at `localhost:3000`.

## Basic node development
* You'll have to first prepare and run the local database service:
  * [Install mongoDB](https://www.mongodb.com/download-center)
  * Initialize your local mongoDB database by running `mongod`
* Setup local instance of app:
  * [Install node](https://nodejs.org/en/download/)
  * Run `npm install`
  * Run `grunt db-seed` to seed your local database
  * Run `grunt develop`

As before, should find the site at `localhost:3000`.
