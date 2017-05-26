var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var path = require('path');
var dataHandler = require('./server/dataHandler.js')
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '/app/public')));

app.use(session({
  secret: 'shhhh',
  resave: false,
  saveUninitialized: true
}))

app.get('/redditPosts/:number', function(req, res) {
  dataHandler.getPosts(req.params.number, function(result) {
    res.send(result);
  })
});

app.post('/signup', function(req, res) {
  console.log('in signup post', req.body)
  dataHandler.createUser(req.body.username, req.body.password, function(err, result) {
    if(err) {
      res.status(500).send(err)
    } else {
      req.session.user = req.body.username;
      res.status(200).send(result); 
    }
  })
})

app.post('/login', function(req, res) {
  console.log('password at login is', req.body)
  dataHandler.checkLogin(req.body.username, req.body.password, function(err, result) {
    if(err === 'sorry that user does not exist') {
      res.status(500).send('sorry that user does not exist')
    }
    else if(err) {
      res.status(500).send(err)
    } else{
      console.log('result of login is', result)
      req.session.user = req.body.username;
      if(result === true) {
        console.log('successful login')
        res.status(200).send(req.session.user)
      } else {
        console.log('unsuccesful login - passwords do not match')
        res.status(500).send('unsuccesful login - passwords do not match');
      }
    }
  }) 
});

app.get('/checkSession', function(req, res) {
  res.send(req.session);
})

app.get('/destroySession', function(req, res) {
  req.session.destroy(function(err) {
    console.log('error in destroy session', err);
  })
  res.send('user destroyeddd');
})

app.get('/userPreferences', function(req, res) {
  dataHandler.getUserPreferences(req.session.user, function(err, result) {
    if(err) {
      res.status(500).send(err)
    } else {
      console.log('got userpreferences as', result)
      res.status(200).send(result)
    }
  })
})

app.post('/userPreferences', function(req, res) {
  dataHandler.postUserPreferences(req.session.user, req.body.linkTime, function(err, result) {
    if(err) {
      res.status(500).send(err)
    } else {
      console.log()
      res.status(200).send(result)
    }
  })
})

app.post('/savePost', function(req, res) {
  dataHandler.savePost(req.session.user, req.body.post, function(err, result) {
    if(err) {
      console.log('error in saving post')
      res.status(500).send(err)
    } else  {
      console.log('saved post, result is', result)
      res.status(200).send(result)
    }
  })
})

app.get('/savePost', function(req, res) {
  console.log('clietn send us', req.session.user, req.params);
  dataHandler.getSavedPosts(req.session.user, function(err, result) {
    if(err) {
      res.status(500).send(err)
    } else {
      console.log('result is', result)
      res.status(200).send(result);
    }
  })
})

app.post('/deletePost', function(req, res) {
  console.log('in server going to delete', req.body)
  dataHandler.deletePost(req.session.user, req.body.post, function(err, result) {
    if(err) {
      res.status(500).send(err)
    } else {
      res.status(200).send(result);
    }
  })
})

app.listen(3000, () => {
  console.log('Listening on port 3000');
});