var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bluebird = require('bluebird');
var db = require('../db-config.js');

var userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: {unique: true}
  },
  password: {
    type: String,
    required: true,
  },
  linkLength: {
    type: Number,
    default: 20
  },
  savedPosts: {
    type: Array,
    default: []
  }
})

var User = db.model('User', userSchema);
//can't be User
userSchema.pre('save', function(next) {
  console.log('encrypting in pre-save');
  var encrypt = bluebird.promisify(bcrypt.hash)
  return encrypt(this.password, null, null)
  .then((hash) => {
    this.password = hash
    next();
  })
  .catch((err) => {
    console.log('wtf happened', err)
  })
}) 
// userSchema.pre('save', function(next){
//   var context = this;
//   console.log('password is', this.password)
//   console.log('encrypting in pre-save');
//   var cipher = bluebird.promisify(bcrypt.hash);
//   return cipher(context.password, null, null)
//   .then((hash)=>{
//     console.log('hashing');
//     context.password = hash;
//     next();
//   })
//   .catch(err => {
//     console.log('error', err);
//   })
// })

User.checkPassword = (attempt, hash) => {
  return new bluebird((resolve, reject) => {
    return bcrypt.compare(attempt, hash, (err, match) => {
      if(err) {
        console.log('those passwords dont match')
        return reject(err);
      } else {
        console.log('passwords match', match)
        return resolve(match)
      }
    })
  })
} 

module.exports = User;