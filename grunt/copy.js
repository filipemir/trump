const paths = require('../paths');

module.exports = function() {
  return {
    files: {
      src: `${paths.src.img}/face.jpg`,
      dest: `${paths.dist.img}/trump.jpg`,
    }
  }
};