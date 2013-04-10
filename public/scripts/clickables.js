$(document).ready(function(){
	
	$('#search_group').click(function(){
		var hname = $('#search_words').val();
		$.post('/search', {searchword: hname}, function(){
			location = '/searchgroups';
		});
	});
});