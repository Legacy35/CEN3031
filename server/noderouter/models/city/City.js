const mongoose = require('mongoose');

const City = new mongoose.Schema({
  name: { type: String, required: true },
  state: { type: String, required: true }, /*Eg: "Florida", not "FL". Can also be a province or territory.*/
 country: { type: String, required: false }, /*Eg: "United States", not "US"*/
  coordinates: {
    latitude: Number,
    longitude: Number
  },
  rank: { type: mongoose.Number },
  climate: { type: mongoose.Number },
  accidents: [
    {
      date: Number,
      weather: [String]
    }
  ]
});

module.exports = City
