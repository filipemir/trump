<p align="center">
    <img src="https://raw.githubusercontent.com/filipemir/trump/master/public/static/img/face-orange.png" width="100px">
</p>

# The Best Words
A small sampling of Donald Trump's best words. Heavily inspired by (and indebted to)
[They Don't Want You To Win](http://www.theydontwantyouto.win), a far funnier and less depressing
project. See it live at [the-best-words.com](http://www.the-best-words.com).

## Development

### Local development with node
* Prepare and run the local database service:
  * [Install mongoDB](https://www.mongodb.com/download-center)
  * Initialize your local mongoDB database by running `mongod`
* Setup local instance of app:
  * [Install node](https://nodejs.org/en/download/)
  * Run `npm install`
  * Run `grunt db-seed` to seed your local database
  * Run `grunt develop`

App should be available on port 3000.


### Deployment with Docker
* Install [Docker Community Edition](https://docs.docker.com/engine/installation/). Ensure your installation includes
the Docker engine and Docker Compose
* Run `docker-compose up --build`

That's it. Should be available on port 3000.
