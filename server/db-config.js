var mongoose = require('mongoose');

mongoURI = 'mongodb://dosaki:mvp@ds111559.mlab.com:11559/reddit_recovery'
mongoose.connect(mongoURI);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', () => {
  console.log('Mongodb connection open');
});

module.exports = db;