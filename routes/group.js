
/*
 * GET group listing.
 */

var Models = require('../models/mibi_models.js')
	, Member = Models[0]
	, Group = Models[1];

 exports.allgroups = function(req, res){
 	Group.find({habit: req.body.name}).exec(function (err, docs){
 		res.render('groups', {title: 'MakeIt-BreakIt', group_list: docs});
 	});
 };

 exports.getgroup = function(req, res){
	Group.find({'habit':req.params.name}).sort('deadline').exec(function (err, docs) {
		if (err)
		return console.log("error", cats);
		// send it back
		res.render('group_pg', {title: docs[0].name});
	});
 };