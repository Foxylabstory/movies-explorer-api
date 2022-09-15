const router = require('express').Router();

const signup = require('./signup');
const signin = require('./signin');
const auth = require('../middlewares/auth');
const users = require('./users');
const movies = require('./movies');

const NotFoundError = require('../errors/notFoundError');
const { crashErrorMessage, pageNotFoundMessage } = require('../utils/errorMessages');

// следующий роут уронит сервер
router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(crashErrorMessage);
  }, 0);
});

router.use('/signup', signup);
router.use('/signin', signin);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);
router.use('/*', () => {
  throw new NotFoundError(pageNotFoundMessage);
});

module.exports = router;
