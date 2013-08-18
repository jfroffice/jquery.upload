$('#files').upload({
	url: 'http://u01.dlyce.com',
	data: {
		id: 'my_id',
		module: 'my_module'
	},
	onProgress: function(e) {
		if (e.lengthComputable) {
            var percent = Math.ceil(e.loaded / e.total * 100);
            console.log(percent);
        }
	},
	onSuccess: function(data) {
		$('#results').html('')
			.append($('<img/>').attr('src', data.url + '/512' ))
			.append($('<img/>').attr('src', data.url + '/256' ))
			.append($('<img/>').attr('src', data.url + '/128' ))
			.append($('<img/>').attr('src', data.url + '/64' ));
	},
	onError: function(jqXHR, textStatus, message) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(message);
	}
});