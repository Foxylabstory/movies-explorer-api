const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createMovie,
  findMovies,
  deleteMovie,
  // likeCard,
  // dislikeCard,
} = require('../controllers/movies');

router.get('/', findMovies);

router.delete('/:_movieId', celebrate({
  params: Joi.object().keys({
    // cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

router.post('/', celebrate({
  body: Joi.object().keys({
    // name: Joi.string().required().min(2).max(30),
    // link: Joi.string().required().pattern(/https?:\/\/(www\.)?[a-zA-Z\d\-.]{1,}\.[a-z]{1,6}([/a-z0-9\-._~:?#[\]@!$&'()*+,;=]*)/),
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
