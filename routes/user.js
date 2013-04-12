
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
	Member.find({fb_id: req.session.user}).exec(function (err, docs){
		var user = docs[0]
			, name = user.name;
		Bridge.find({mem_id: user.fb_id}).exec(function (err, cons){
			console.log(cons);
			res.render('profile', {title: 'MakeIt-BreakIt', name: name, habit_list: cons});
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
		Group.search({_id: req.body.group_id}).exec(function (err, gps){
			var userid = docs[0]._id
				, username = docs[0].name
				, gpid = gps[0]._id
				, hname = gps[0].habit
				, des = gps[0].description
				, deln = gps[0].deadline
				, bet = req.body.newbet
				, newmon = gps[0].monpool + bet;

			var joingp = new Bridge({mem_id: userid, mem_name: username
				, gp_id: gpid, habit: hname, description: des
				, deadline: deln, my_bet: bet});

			modnewhabit.save(function (err){
				console.log('Bridge Made');

				Group.find({_id: gps[0]._id}).update({monpool: newmon});

				res.redirect('/profile');
			});
		});
	});
};

exports.record = function(req,res){
	res.render('record', { title: 'Record your achievement' });
}

exports.mturk = function(req,res){
	res.render('mechturk',{title: 'Mechanical Turk'});
}
