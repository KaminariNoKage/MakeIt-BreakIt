
/*
 * GET users listing.
 */

exports.home = function(req, res){
	req.facebook.api('/me', function(err, data) {
		res.render('index', { title: 'Home Page!' , name: data.name});
	});
};

exports.myprofile = function(req, res){
	var userid = req.session.user;
	
};