
/*
 * GET users listing.
 */

var Models = require('../models/mibi_models.js')
	, Member = Models[0]
	, Group = Models[1]
	, Bridge = Models[2];

exports.home = function(req, res){
	var userid = req.session.user;
	Member.find({fb_id: userid}).exec(function (err, docs){
		res.render('homepage', { title: 'MakeIt-BreakIt' , user_id: userid});
	});
};

exports.myprofile = function(req, res){
	req.facebook.api('/me', function(err, data) {
		req.facebook.api('/me/friends', function(err, fren) {
			var image = "https://graph.facebook.com/" + data.username + "/picture?width=200&height=200"
				, fb = fren.data;
			Member.find({fb_id: req.session.user}).exec(function (err, docs){
				var user = docs[0]
					, name = user.name
					, friendlist = [];

				for (var i=0; i<(fb.length); i++){
					for (var v=0; v<docs.length; v++){
						if (fb[i].id == docs[v].fb_id){
							friendlist.push(fb[i].name);
						};
					};
				};
				if (friendlist.length == 0){
					friendlist.push('You have no friends. Maybe you should work on that?');
				};


				console.log(friendlist);
				Bridge.find({mem_id: user.fb_id}).exec(function (err, cons){
					res.render('profile', {title: 'MakeIt-BreakIt', name: name, img: image, habit: cons[0], friend_list: friendlist});
				});
			});
		});
	});
};

exports.newgroup = function(req, res){
	var userid = req.session.user;
	res.render('newgroup', {title: 'MakeIt-BreakIt', userid: userid});
};


/*
 * Various POST functions for buttons
 */

//Adds a member to a group
exports.join = function(req, res){
	Member.find({fb_id: req.session.user}).exec(function (err, docs){
		Group.find({_id: req.body.group_id}).exec(function (err, gps){
			console.log(gps);
			var userid = docs[0]._id
				, username = docs[0].name
				, gpid = gps[0]._id
				, hname = gps[0].habit
				, des = gps[0].description
				, deln = gps[0].deadline
				, bet = req.body.newbet
				, newmon = gps[0].monpool + parseInt(bet);

			var joingp = new Bridge({mem_id: userid, mem_name: username
				, gp_id: gpid, habit: hname, description: des
				, deadline: deln, my_bet: bet});

			joingp.save(function (err){
				console.log('Bridge Made');

				Group.find({_id: gps[0]._id}).update({monpool: newmon});

				res.redirect('/profile');
			});
		});
	});
};

exports.record = function(req,res){
	res.render('record', { title: 'Express' });
}
