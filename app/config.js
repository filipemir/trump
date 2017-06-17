const paths = require('../paths');

module.exports = {
  db: {
    seeder: `${paths.appDir}/trumpisms.json`,
    production: {
      URI: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_LOCATION}/the-best-words`,
      db: 'the-best-words',
      collection: 'quotes',
      user: process.env.DB_USER,
      pw: process.env.DB_PASSWORD
    },
    development: {
      // For the URI below to work in local development,
      // ensure that the following line is in the hosts
      // file: 127.0.0.1    mongo
      URI: 'mongodb://mongo/the-best-words',
      db: 'the-best-words',
      collection: 'quotes',
    }
  }
};