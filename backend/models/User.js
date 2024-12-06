const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: String,
  supervisor: { type: Schema.Types.ObjectId, ref: 'User' },
  peers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  juniors: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('User', UserSchema);