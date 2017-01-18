var axios = require('axios');
var db = require('./db-config.js')
var User = require('./models/User.js')
var mongoose = require('mongoose')
var lodash = require('lodash');
var Promise = require('bluebird')

Promise.promisifyAll(mongoose)
mongoose.Promise = require('bluebird');

exports.getPosts = function(number, cb) {
	axios.get('https://api.reddit.com/r/all/?limit=100')
	.then(function(response) {
		var responseData = []
		var denied = 0;
		for(var i = 0; i <number; i++) {
			if(!response.data.data.children[i].data.over_18) {
				responseData.push({
					title: response.data.data.children[i].data.title,
					text: response.data.data.children[i].data.selftext,
					url: response.data.data.children[i].data.url.replace(/&amp;/g, '&'),
					subreddit: response.data.data.children[i].data.subreddit
				})
			} else {
				denied++
			}
		}
		console.log(denied+' elements removed because of NSFW material')
		cb([responseData, denied]);
	})
	.catch(function(error){
	  console.log('error in reddit api request',error)
	})
}

exports.checkLogin = function(username, attemptedPassword, cb) {
	User.findOne({username: username})
	.then(function(result) {
		if(!result) {
			console.log('sorry that user does not exist', result)
			cb('sorry that user does not exist', null)
		} else {
			console.log('found user', result.password, attemptedPassword)
			User.checkPassword(attemptedPassword, result.password)
			.then((result) => {
				console.log('password checked', result);
				cb(null, result)
			})
			.catch((error) => {
				console.log('error in check password', error);
				cb(error, null)
			})
		}		
	})
	.catch(err => {
		console.log('error is', err)
	})
};

exports.createUser = function(username, password, cb) {
	console.log('in user creation with ', username, password);
	User.find({username: username})
	.then(function(result) {
		console.log('result is ', result)
		if(result.length <1) {
			console.log('creating user')
			User.create({
				username: username,
				password: password
			})
			.then((newUser) => {
				console.log('in then of create');
				cb(null, newUser)
			})
			.catch((error) => {
				console.log('in catch of create');
				cb(error, null)
			}) 
		} else {
			console.log('user already exists')
			cb('user already exists', null);
		}
	})
	.catch(function(error) {
		console.log('errror is', error)
	})
};

exports.getUserPreferences = function(user, cb) {
	console.log('got into data handler get user preferences with', user)
	User.findOne({username: user})
	.then(function(result) {
		console.log('got user', result)
		cb(null, result)
	})
	.catch(function(err) {
		console.log('error in getting user preferences')
		cb(err);
	})
}

exports.postUserPreferences = function(user, linkTime, cb) {
	console.log('got into data handler post user prefrences with', user, linkTime)
	User.update({username: user}, {$set: {linkLength: linkTime}}, {upsert:false}, function(err, result) {
		if(err) {
			console.log('error in post')
			cb(err)
		} else {
			console.log('successful post user pref', result)
			cb(null, result)
		}
	})
	//both promise and callback work here
	// .then(result => {
	// 	console.log('success in post pref', result)
	// 	cb(null, result)
	// })
	// .catch(err => {
	// 	console.log('error in posting preferences')
	// 	cb(err)
	// })
}

exports.savePost = function(user, post, cb) {
	User.update({username: user}, {$push: {savedPosts: post}}, {upsert: false}, function(err, result) {
		if(err) {
			cb(err)
		} else {
			cb(null, result);
		}
	})
}

exports.getSavedPosts = function(user, cb) {
	User.findOne({username: user})
	.then(function(result) {
		cb(null, result.savedPosts)
	})
	.catch(function(err){
		cb(err)
	})
}

exports.deletePost = function(user, index, cb) {
	console.log('inside deleteion index, got', user, index)
	User.findOne({username : user})
	.then(function(result) {
		var savedPosts = result.savedPosts;
		savedPosts.splice(index, 1)
		User.update({username: user}, {$set: {savedPosts: savedPosts}}, {upsert: false}, function(err, result) {
			if(err) {
				cb(err)
			} else {
				cb(null, result)
			}
		})
		console.log('saved posts is', savedPosts);
	})
	.catch(function(err) {
		console.log('erorr in finding user to delete post', err)
	})
}

// exports.createUser = (inputUser, inputPass, cb) => {
//   User.findOne({username : inputUser}).then(foundUser => {
//   //  console.log('FoundUser', foundUser);
//     if(!foundUser){
//       User.create({
//         username : inputUser,
//         password : inputPass
//       }).then(createdUser => {
//         cb(null, {created : true, id : createdUser._id})
//       }).catch(error => {
//         console.log('in create error', error);
//         cb(error)
//       })
//     } else {
//       cb('User Already Exists!');
//     }
//   }).catch(error => {
//     cb(error);
//     console.log('error', error);
//   });
// }
