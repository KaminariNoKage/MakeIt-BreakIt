var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {});

var memberSchema = mongoose.Schema({
	name: String,
	fb_id: String
});

var habitSchema = mongoose.Schema({
	title: String,
	Description: String
});

var Member = mongoose.model('Member', memberSchema);
module.exports = Member;