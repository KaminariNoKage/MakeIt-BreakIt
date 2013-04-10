
/*
 * GET users listing.
 */

var Models = require('../models/mibi_models.js')
	, Member = Models[0]
	, Group = Models[1];

exports.home = function(req, res){
	var userid = req.session.user;
	Member.find({fb_id: userid}).exec(function (err, docs){
		res.render('homepage', { title: 'MakeIt-BreakIt' , user_id: userid});
	});
};

exports.myprofile = function(req, res){
	Member.find({fb_id: req.session.user}).exec(function (err, docs){
		var user = docs[0]
			, name = user.name
			, groups = user.habits;
		if (groups.length == 0){
			groups.push('You are not signed up for any groups. Try joining one or making your own!');
		};
		res.render('profile', {title: 'MakeIt-BreakIt', name: name, habit_list: groups});

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
		var user = docs[0]
			, name = user.name
			, groups = user.habits;
		Group.search({_id: req.body.group_id}).exec(function (err, docs){
			//Make sure member not in group already, or group part of member's list
			//Add group to the member's list of joined groups.
			//{group_list: group_id, bet: $$}
			//Add the member to the groups current list of 
		});
	});
};
