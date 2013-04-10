
/*
 * GET home page.
 */

var Models = require('../models/mibi_models.js')
	, Member = Models[0]
	, Group = Models[1];

exports.index = function(req, res){
	req.facebook.api('/me', function(err, data) {
		var id = data.id;

		Member.find({fb_id: id}).exec(function (err, docs){
			var curr = docs[0]; //Current Member logged in

			if (curr == null){
				var newb = new Member({name: data.name, fb_id: id, habits: []});
				console.log('New user made');
				newb.save(function (err) {
					if (err)
						return console.log("Error: We couldn't save the new Member");
					//Setting the user session to the current user if new
					req.session.user = id;
					//Redirecting to home for more fun stuff
					res.redirect('/home');
				});
			}
			else{
				if (req.session.user != id){
					//If the person just logged in, redirect to the home page
					req.session.user = id
					res.redirect('/home');
				}
				else{
					//else redirect to the profile page
					res.redirect('/profile');
				};
			};

		});
	});
};