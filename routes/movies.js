const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createMovie,
  findMovies,
  deleteMovie,
  // likeCard,
  // dislikeCard,
} = require('../controllers/movies');
const { isURLValidation } = require('../utils/validation');

router.get('/', findMovies);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(isURLValidation),
    trailerLink: Joi.string().required().custom(isURLValidation),
    thumbnail: Joi.string().required().custom(isURLValidation),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);

/* router.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard); */

/* router.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard); */

module.exports = router;
