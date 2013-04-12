
/*
 * GET group listing.
 */

var Models = require('../models/mibi_models.js')
	, Member = Models[0]
	, Group = Models[1]
	, Bridge = Models[2];

exports.allgroups = function(req, res){
	Group.find().sort('deadline').exec(function (err, docs){
		res.render('groups', {title: 'MakeIt-BreakIt', user_id: req.session.user, name: 'All Groups', group_list: docs});
	});
};

exports.searchgroups = function(req, res){
	Group.find({habit: req.session.searchword}).sort('deadline').exec(function (err, docs){
		res.render('groups', {title: 'MakeIt-BreakIt', user_id: req.session.user, name: req.session.searchword, group_list: docs});
	});
};

 exports.getgroup = function(req, res){
	Group.find({'habit':req.params.name}).sort('deadline').exec(function (err, docs) {
		if (err)
		return console.log("error", docs);
		// send it back
		res.render('group_pg', {title: docs[0].name});
	});
 };

 /*
  * ALL Post functions
  */
exports.search = function(req, res){
	req.session.searchword = req.body.searchword;
	res.redirect('/searchgroups');
};

exports.make = function(req, res){
	//Making a New Group
	var userid = req.session.user
		, gpname = req.body.groupname
		, gpdes = req.body.groupdescription
		, gpdeln = req.body.groupdeadline
		, gpbet = req.body.minimumbet;
	
	Member.find({fb_id: userid}).exec(function (err, docs){

		//Making the new group
		var newhabit = new Group({habit: gpname, description: gpdes, deadline: gpdeln, monpool: gpbet});
		newhabit.save(function (err) {
			if (err)
				return console.log("Error: We couldn't save the new Member");

			console.log('New group saved', newhabit);
			//Adding the new group the the member's groups
			var modnewhabit = new Bridge({mem_id: userid, mem_name: docs[0].name
				, gp_id: newhabit._id, habit: gpname, description: gpdes
				, deadline: gpdeln, my_bet: gpbet});

			modnewhabit.save(function (err){
				console.log('Bridge Made', modnewhabit);
				res.redirect('/profile');
			});
		});
	});
};