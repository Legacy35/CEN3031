const axios = require('axios');
const config = require('./../config.js');
const CitySchema = require('./../models/city/city.js');

export const createCity = (req, res) => {
  CitySchema.create({
    name: req.body.name,
    state: req.body.state,
    country: req.body.country,
    coordinates: {
      latitude: req.body.lat,
      longitude: req.body.lng,
    },
    rank: req.body.rank,
    climate: req.body.climate,
  }, function (err, CitySchema) {
    if (err) return handleError(err);
    res.send(CitySchema);
  });

  res.status(200);
};

const Sort = ['Ranking', 'Alphabetical', 'Similarity'];
export const citySearch = (req, res) => {
  if (req.sort == Sort.Ranking) {
    CitySchema.collection.find({
      name: req.filter,
    }).sort({
      rank: asc,
    }).limit(req.limit);
  } else if (req.sort == Sort.Alphabetical) {
    CitySchema.collection.find({
      name: req.filter,
    }).sort({
      name: asc,
    }).limit(req.limit);
  } else if (req.sort == Sort.Similarity) { //TODO : Implement this for Sprint 2
    CitySchema.collection.find({
      name: req.filter,
    }).sort({
      name: asc,
    }).limit(req.limit);
  }
};
