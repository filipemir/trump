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
      URI: 'mongodb://mongodb/the-best-words',
      db: 'the-best-words',
      collection: 'quotes',
    }
  }
};