const mongoose = require('mongoose');

const Question = new mongoose.Schema({
  Question:   { type: String, required: true },
  Answer:     { type: String, required: true },
  WrongAns1:  { type: String, required: false },
  WrongAns2:  { type: String, required: false },
  WrongAns3:  { type: String, required: false },
});

module.exports = Question
