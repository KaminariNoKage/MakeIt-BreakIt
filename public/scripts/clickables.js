$(document).ready(function(){
	
	$('#search_group').click(function(){
		var hname = $('#search_words').val();
		$.post('/search', {searchword: hname}, function(){
			location = '/searchgroups';
		});
		return false;
	});

	$('#submitter').click(function(){
		var newgroup = $('#makeGroupForm').serialize();
		console.log(newgroup);
		$.post('/makegroup', newgroup, function(){
			location = '/home';
		});
	});
});