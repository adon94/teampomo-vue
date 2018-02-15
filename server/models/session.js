const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SessionSchema = new Schema({
  workMinutes: { type: 'Number', required: true },
  breakMinutes: { type: 'Number', required: true },
  startedAt: { type: 'Date', default: Date.now, required: false },
  pomoCount: { type: 'Number', default: 0, required: true },
  isActive: { type: 'Boolean', default: true, required: true },
  isPlaying: { type: 'Boolean', default: true, required: true },
  teamId: { type: 'String', required: true },
  createdById: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

var Session = mongoose.model("Session", SessionSchema);
module.exports = Session;

//next break at {{startedAt + duration}}