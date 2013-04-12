var mongoose = require('mongoose')
	, Schema = mongoose.Schema;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {});

var memberSchema = mongoose.Schema({
	name: String,
	fb_id: String
});

var bridgeSchema = mongoose.Schema({
	mem_id: String,
	mem_name: String,
	gp_id: String,
	habit: String,
	description: String,
	deadline: String,
	my_bet: Number
})

var groupSchema = mongoose.Schema({
	habit: String,
	description: String,
	deadline: String,
	monpool: Number
});

var Member = mongoose.model('Member', memberSchema);
var Group = mongoose.model('Group', groupSchema);
var Bridge = mongoose.model('Bridge', bridgeSchema);
module.exports = [Member, Group, Bridge];