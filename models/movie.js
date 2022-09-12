const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'country is required'],
  },
  director: {
    type: String,
    required: [true, 'director is required'],
  },
  duration: {
    type: Number,
    required: [true, 'duration is required'],
  },
  year: {
    type: String,
    required: [true, 'year is required'],
  },
  description: {
    type: String,
    required: [true, 'description is required'],
  },
  image: {
    type: String,
    required: [true, 'image is required'],
    validator: (link) => {
      validator.isURL(link, {
        protocols: ['http', 'https'],
        require_protocol: true,
      });
    },
  },
  trailerLink: {
    type: String,
    required: [true, 'trailerLink is required'],
    validator: (link) => {
      validator.isURL(link, {
        protocols: ['http', 'https'],
        require_protocol: true,
      });
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'thumbnail is required'],
    validator: (link) => {
      validator.isURL(link, {
        protocols: ['http', 'https'],
        require_protocol: true,
      });
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'owner is required'],
  },
  movieId: {
    type: Number,
    required: [true, 'movieId is required'],
  },
  nameRu: {
    type: String,
    required: [true, 'nameRu is required'],
  },
  nameEN: {
    type: String,
    required: [true, 'nameEN is required'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
