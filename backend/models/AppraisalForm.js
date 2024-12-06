const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppraisalFormSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  filledBy: { type: Schema.Types.ObjectId, ref: 'User' },
  answers: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AppraisalForm', AppraisalFormSchema);
