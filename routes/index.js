
/*
 * GET home page.
 */

exports.index = function(req, res){
	req.facebook.api('/me', function(err, data) {
		req.facebook.api('/me/friends', function(err, friends){
			res.send({'self': data, 'friend_list': friends.data});
			//res.render('index', { title: 'Express' });
		});
	});
};