var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {});

var memberSchema = mongoose.Schema({
	name: String,
	fb_id: String,
	habits: Array	//NOTE: Format {group_id: ***, bet: ***}
});

var groupSchema = mongoose.Schema({
	habit: String,
	description: String,
	deadline: String,
	people: Array,	//NOTE: Format {member_id: ***, bet: ***}
	monpool: Number,
});

var Member = mongoose.model('Member', memberSchema);
var Group = mongoose.model('Group', groupSchema);
module.exports = [Member, Group];