const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  text: String
});

module.exports = mongoose.model('Question', QuestionSchema);
