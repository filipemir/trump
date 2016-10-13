const paths = require('../paths');

module.exports = function() {
  return {
    my_target: {
      files: {
        [`${paths.dist.js}/trump.min.js`]: `${paths.dist.js}/trump.js`
      }
    }
  };
};