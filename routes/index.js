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
/* app.get('/signout', (req, res, next) => {
  try {
    res
      .clearCookie('jwt', {
        // httpOnly: true, // выключили доступ к куке из ЖС
        sameSite: 'None', // принимает/отправляет куки только с того же домена
        secure: 'True',
      })
      .header({
        'Cross-Origin-Resource-Policy': 'cross-origin',
        'Acces-Control-Allow-Credentials': 'true',
      })
      .send({ message: 'Выход успешный' });
  } catch (err) {
    next(err);
  }
}); */
router.use('/*', () => {
  throw new NotFoundError(pageNotFoundMessage);
});

module.exports = router;
