<p align="center"><img src="https://raw.githubusercontent.com/filipemir/trump/master/public/src/img/face-orange.png"></p>

# The Best Words
A look at a minuscule fraction of the many truly unbelievable things Donald Trump has said.

### Local development steps
* Clone repository
* Prepare local database:
  * [Install mongoDB](https://www.mongodb.com/download-center)
  * Initialize your local mongoDB database by running `mongod`
* Setup local instance of app:
  * [Install node](https://nodejs.org/en/download/)
  * Run `npm install`
  * Run `grunt db-seed` to seed your local database
  * Run `grunt develop`

### Deployment steps:
In order to deploy, you'll need to setup a hosted mongo database somewhere (I use [mLab](www.mlab.com)). Once you have set your hosted datbase up, you'll need to specify the environment variables below in whatever environment will be running the app in production. To run it locally in the production environment, insert the following in a `.env` file in the project's root:

```
DB_LOCATION=<location of mongoDB in production, e.g. 'ds123456.mlab.com:23456'>
DB_USER=<username to access DB>
DB_PASSWORD=<password to access DB>
```

Then seed your production database by running `grunt db-seed --env=production`.


