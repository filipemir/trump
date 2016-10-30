### Local development steps
* Clone repository
* [Install mongoDB](https://www.mongodb.com/download-center)
* [Install node](https://nodejs.org/en/download/)
* Run `npm install`
* Run `grunt db-seed`
* Run `grutn develop`

### Important deployment steps:
In order to deploy, the code expects to find a `.env` file in the root folder with the following values:

```
DB_LOCATION=<location of mongoDB in production, e.g. 'ds123456.mlab.com:23456'>
DB_USER=<username to access DB>
DB_PASSWORD=<password to access DB>
```

Then seed your production database by running `grunt db-seed --env=production`


