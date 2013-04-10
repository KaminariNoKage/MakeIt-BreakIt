
/*
 * GET users listing.
 */

var Models = require('../models/mibi_models.js')
	, Member = Models[0]
	, Group = Models[1];

exports.home = function(req, res){
	var userid = req.session.user;
	Member.find({fb_id: userid}).exec(function (err, docs){
		res.render('home', { title: 'Home Page!' , name: docs[0].name});
	});
};

exports.myprofile = function(req, res){
	Member.search({fb_id: req.session.user}).exec(function (err, docs){
		var user = docs[0]
			, name = user.name
			, groups = user.habits;
		if (groups.length == 0){
			groups.push('You are not signed up for any groups. Try joining one or making your own!');
		};
		res.render('profile', {title: 'MakeIt-BreakIt', name: name, habit_list: groups});

	});
};


//Various POST functions for buttons
exports.join = function(req, res){
	Member.search({fb_id: req.session.user}).exec(function (err, docs){
		var user = docs[0]
			, name = user.name
			, groups = user.habits;
		if (groups.length == 0){
			groups.push('You are not signed up for any groups. Try joining one or making your own!');
		}
		else{
			Group.search({habit: req.body.habit}).exec({
				res.render('profile', {title: 'MakeIt-BreakIt', name: name, habit_list: groups});

			});
		};
	});
};
