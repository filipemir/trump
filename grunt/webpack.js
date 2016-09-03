const paths = require('../paths');

module.exports = function() {
  return {
    default: {
      entry: `${paths.src.js}/audio.js`,
      output: {
        path: `${paths.dist.js}`,
        filename: 'audio.js'
      },
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel',
          exclude: /(node_modules)/,
          query: { presets: ['es2015'] }
        }]
      }
    }
  };
};