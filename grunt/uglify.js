const paths = require('../paths');

module.exports = function() {
  return {
    my_target: {
      files: {
        [`${paths.dist.js}/audio.min.js`]: `${paths.dist.js}/audio.js`
      }
    }
  };
};