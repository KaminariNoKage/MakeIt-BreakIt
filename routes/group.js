
/*
 * GET group listing.
 */

var Models = require('../models/mibi_models.js')
	, Member = Models[0]
	, Group = Models[1];

exports.allgroups = function(req, res){
	Group.find().sort('deadline').exec(function (err, docs){
		res.render('groups', {title: 'MakeIt-BreakIt', name: 'All Groups', group_list: docs});
	});
};

exports.searchgroups = function(req, res){
	Group.find({habit: req.session.searchword}).sort('deadline').exec(function (err, docs){
		res.render('groups', {title: 'MakeIt-BreakIt', name: req.session.searchword, group_list: docs});
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