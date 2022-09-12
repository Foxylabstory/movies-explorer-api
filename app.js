require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
// const { NOT_FOUND } = require('./errors/errorStatuses');
const signup = require('./routes/signup');
const signin = require('./routes/signin');
const auth = require('./middlewares/auth');
const users = require('./routes/users');
const cards = require('./routes/cards');
const NotFoundError = require('./errors/notFoundError');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, BASE_PATH } = process.env;

const corsOption = {
  origin: ['https://foxylab.nomoredomains.sbs', 'http://foxylab.nomoredomains.sbs', 'https://www.foxylab.nomoredomains.sbs', 'http://www.foxylab.nomoredomains.sbs', 'http://localhost:3001', 'http://localhost:3000'],
  credentials: true,
  // preflightContinue: true,
};

const app = express();
app.use(cors(corsOption)); // разрешает междоменные запросы
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 100, // можно совершить максимум 100 запросов с одного IP
});
app.use(requestLogger); // подключаем логгер запросов
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// слеедующий роут уронит сервер
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use('/signup', signup);
app.use('/signin', signin);

app.use(auth);

app.use('/users', users);
app.use('/cards', cards);
app.get('/signout', (req, res, next) => {
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
});
app.use('/*', () => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger); // подключаем логгер ошибок

app.use(errors()); // обработчик ошибок celebrate
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({ message: statusCode === 500 ? 'На сервере произошла ошибка' : message });
  next();
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
    // useCreateIndex: true, //https://stackoverflow.com/questions/68958221/mongoparseerror-options-usecreateindex-usefindandmodify-are-not-supported
    // useFindAndModify: false, //https://stackoverflow.com/questions/68958221/mongoparseerror-options-usecreateindex-usefindandmodify-are-not-supported
  });
  console.log('Connected to db');
  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Ссылка на сервер');
    console.log(BASE_PATH);
  });
}

main();
