$('#files').upload({
	url: 'http://u01.dlyce.com',
	data: {
		id: 'my_id',
		module: 'my_module'
	},
	progress: function(e) {
		if (e.lengthComputable) {
            var percent = Math.ceil(e.loaded / e.total * 100);
            console.log(percent);
        }
	},
	done: function(data) {
		$('#results').html('')
			.append($('<img/>').attr('src', data.url + '/512' ))
			.append($('<img/>').attr('src', data.url + '/256' ))
			.append($('<img/>').attr('src', data.url + '/128' ))
			.append($('<img/>').attr('src', data.url + '/64' ));
	},
	failed: function(jqXHR, textStatus, message) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(message);
	}
});