const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  companyName: { type: 'String', required: true },
  teamName: { type: 'String', required: true },
  accessPassword: { type: 'String', required: true },
  createdById: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

var Team = mongoose.model("Team", TeamSchema);
module.exports = Team;