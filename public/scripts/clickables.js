$(document).ready(function(){
	
	$('#search_group').click(function(){
		var hname = $('#search_words').val();
		$.post('/search', {searchword: hname}, function(){
			location = '/searchgroups';
		});
		return false;
	});

	$('#join').click(function(){
		var group_id = $('#join').attr('name')
			, newbet = $('#minbet').val();
		$.post('/joingroup', {group_id: group_id, newbet: newbet}, function(){
			location = '/profile';
		});
		return false;
	});

	$("#main_search").keyup(function(event){
		if(event.keyCode == 13){
			var hname = $('#main_search').val();
			$.post('/search', {searchword: hname}, function(){
				location = '/searchgroups';
			});
			return false;
		};
	});

	$('#submitter').click(function(){
		var newgroup = $('#makeGroupForm').serialize();
		console.log(newgroup);
		$.post('/makegroup', newgroup, function(){
			location = '/profile';
		});
	});
});