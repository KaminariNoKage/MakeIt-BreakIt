/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , group = require('./routes/group')
  , http = require('http')
  , path = require('path')
  , mongoose = require('mongoose')
  , Facebook = require('facebook-node-sdk');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(Facebook.middleware({ appId: '153536081481201', secret: 'b20f49363cb38995416845af76d693f5' }));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/tbook');
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

function facebookGetUser() {
  return function(req, res, next) {
    req.facebook.getUser( function(err, user) {
      if (!user || err){
        res.redirect('/');
      } else {
        req.user = user;
        next();
      }
    });
  }
}

app.get('/', Facebook.loginRequired(), routes.index);
app.get('/home', facebookGetUser(), user.home);
app.get('/profile', facebookGetUser(), user.myprofile);
app.get('/newgroup', facebookGetUser(), user.newgroup);
//app.get('/record', facebookGetUser(), user.record);
//app.get('/submit', facebookGetUser(), user.submit);
app.get('/allgroups', facebookGetUser(), group.allgroups);
app.get('/allgroups/:habit', facebookGetUser(), group.getgroup);
app.get('/searchgroups', facebookGetUser(), group.searchgroups);

//app.post('/joingroup', user.join);
app.post('/makegroup', group.make);
app.post('/search', group.search);
app.get('/record', user.record);
app.get('/mechturk', user.mturk);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
