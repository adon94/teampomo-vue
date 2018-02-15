const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: 'String', required: true, lowercase: true },
  password: { type: 'String', required: true },
  firstName: { type: 'String', required: true },
  lastName: { type: 'String', required: true },
  jobTitle: { type: 'String', required: false },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  teamId: { type: 'String', required: false },
  activeSessionId: { type: 'String', required: false },
});

var User = mongoose.model("User", UserSchema);
module.exports = User;