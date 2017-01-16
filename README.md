<p align="center">
    <img src="https://raw.githubusercontent.com/filipemir/trump/master/public/static/img/face-orange.png" width="100px">
</p>

# The Best Words
A small sampling of Donald Trump's best words. See it live at [the-best-words.com](http://www.the-best-words.com).
Heavily inspired by [They Don't Want You To Win](http://www.theydontwantyouto.win), a far funnier and less discouraging
project.

### Local Development
* Clone repository
* Prepare local database:
  * [Install mongoDB](https://www.mongodb.com/download-center)
  * Initialize your local mongoDB database by running `mongod`
* Setup local instance of app:
  * [Install node](https://nodejs.org/en/download/)
  * Run `npm install`
  * Run `grunt db-seed` to seed your local database
  * Run `grunt develop`

### Deployment
In order to deploy, you'll need to setup a hosted mongo database somewhere. Once you have set your hosted database up,
you'll need to specify the environment variables below in whatever environment will be running the app in production.
To run it locally in the production environment, create a `.env` file in the project's root following this template:

```
DB_LOCATION=<location of mongoDB in production, e.g. 'ds123456.mlab.com:23456'>
DB_USER=<username to access DB>
DB_PASSWORD=<password to access DB>
FB_APP_ID=<id of facebook app, for sharing>
GA_TRACKING_ID=<Google Analytics tracking ID>
```

Then seed your production database by running `grunt db-seed --env=production`.


