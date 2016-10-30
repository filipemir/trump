const DB_USER = process.env.DB_USER,
  DB_PASSWORD = process.env.DB_PASSWORD;

module.exports = {
  db: {
    production: `mongodb://${DB_USER}:${DB_PASSWORD}@ds139267.mlab.com:39267/the-best-words`,
    development: 'mongodb://localhost/trump',
  }
};