var paths = require('../paths');

module.exports = {
  dropDb: {
    command: 'mongo trump --eval "db.dropDatabase()"'
  },
  seedDb: {
    command: `mongoimport -d trump -c quotes --drop ${paths.appDir}/trumpisms.json --jsonArray`
  }
};