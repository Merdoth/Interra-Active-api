require('dotenv').config();

const env = process.env.NODE_ENV || 'development';
const dialect = 'postgres';
let url;
if (env === 'test') {
  url = `${process.env.DATABASE_URL_TEST}`;
} else if (env === 'development') {
  url = `${process.env.DATABASE_URL_DEV}`;
} else if (env === 'production') {
  url = `${process.env.DATABASE_URL}`;
}

const devMode = env === ('development' || 'test');
const config = {
  url,
  dialect,
  logging: devMode ? log => log : false,
  dialectOptions: {
    multipleStatements: true
  }
};

module.exports = config;
