const mongoose = require('mongoose');

const AccidentReport = new mongoose.Schema({
  cityName: {type: String, required: true},
  state: {type: String, required: true}, /*Full name of state, not code*/
  date: {type: Number, required: true,  validate : {validator : Number.isInteger, message : '{VALUE} is not an integer value'}},  //Unix Epoch
  weather : [String] /*Values of weather must be from Weather enum*/
});

module.exports = AccidentReport;
