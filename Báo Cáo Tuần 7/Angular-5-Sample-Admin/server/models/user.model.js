var mongoose =require('mongoose'),
    Schema                  = mongoose.Schema,
    mongooseUniqueValidator = require('mongoose-unique-validator');

const catSchema = new mongoose.Schema({
  username: String,
  password: {type: String, required: true},
  email: {type: String, unique: true, required: true, lowercase: true},
  address: {type: String},
  resetPasswordToken: String,
  resetPasswordExpires: String,
  role: {type: String},
});

const model = mongoose.model('UserRs', catSchema);

module.exports = model;
