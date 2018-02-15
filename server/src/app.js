const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const teams = require('../routes/team.routes')
const users = require('../routes/user.routes')
const sessions = require('../routes/session.routes')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use('/', teams);
app.use('/', users);
app.use('/', sessions);

app.listen(process.env.PORT || 8081)

var mongoose = require('mongoose');
mongoose.connect(//'mongodb://localhost:27017/tigertime' || 
'mongodb://adam:password@ds211588.mlab.com:11588/heroku_njws7stb', {
  useMongoClient: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function (callback) {
  console.log("Connection Succeeded");
});
