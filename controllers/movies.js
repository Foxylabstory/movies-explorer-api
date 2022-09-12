const Movie = require('../models/movie');
const { customError } = require('../errors/customErrors');
const { DONE, CREATED } = require('../errors/statuses');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    /* owner, */
    movieId,
    nameRu,
    nameEN
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner: req.user._id,
    movieId,
    nameRu,
    nameEN,
  })
    .then((movie) => {
      res.status(CREATED).send(movie);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const findMovies = (req, res, next) => {
  Movie.find({}) // .sort({ createdAt: -1 })
    .then((movie) => res.status(DONE).send(movie))
    .catch((err) => {
      customError(err, req, res, next);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params._movieId)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удаляемая запись принадлежит другому пользователю');
      }
      Movie.findByIdAndRemove(req.params._movieId)
        .orFail(() => {
          throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
        })
        .then((movieForDeleting) => {
          res.status(DONE).send(movieForDeleting);
        })
        .catch((err) => {
          customError(err, req, res, next);
        });
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
};

/* const likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
}; */

/* const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .orFail(() => {
      throw new NotFoundError('Запрашиваемые данные по указанному id не найдены');
    })
    .then((card) => {
      res.send(card);
    })
    .catch((err) => {
      customError(err, req, res, next);
    });
}; */

module.exports = {
  createMovie,
  findMovies,
  deleteMovie,
  // likeCard,
  // dislikeCard,
};
