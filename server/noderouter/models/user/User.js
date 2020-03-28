const mongoose = require('mongoose');

const User = new mongoose.Schema({
  _id: { type: Number, required: true },
  quizzes: [Number]
});

module.exports = User
