require('dotenv').config();

const paths = require('../paths');

const isDocker = process.env.IS_DOCKER || false,
  dbLocation = isDocker ? 'mongodb' : 'localhost';

module.exports = {
  db: {
    seeder: `${paths.quotesDir}/trumpisms.json`,
    production: {
      location: process.env.DB_LOCATION,
      URI: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_LOCATION}/the-best-words`,
      db: 'the-best-words',
      collection: 'quotes',
      user: process.env.DB_USER,
      pw: process.env.DB_PASSWORD
    },
    development: {
      location: `${dbLocation}`,
      URI: `mongodb://${dbLocation}/the-best-words`,
      db: 'the-best-words',
      collection: 'quotes',
    }
  }
};