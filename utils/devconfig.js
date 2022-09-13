const DEV_PORT = 3002;
const DEV_DATA_BASE_PATH = 'mongodb://localhost:27017/moviesdb';
const DEV_BASE_PATH = `http://localhost:${DEV_PORT}`;
const DEV_SECRET_KEY = 'dev-key';
const DEV_HASH_LENGTH = 10;

module.exports = {
  DEV_PORT,
  DEV_DATA_BASE_PATH,
  DEV_BASE_PATH,
  DEV_SECRET_KEY,
  DEV_HASH_LENGTH,
};
