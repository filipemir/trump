const paths = require('../paths');

module.exports = function() {
  return {
    my_target: {
      files: {
        [`${paths.dist.css}/index.min.css`]: `${paths.src.css}/index.css`
      }
    }
  };
};