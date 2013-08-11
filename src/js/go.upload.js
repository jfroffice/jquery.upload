$('#files').upload({
	url: 'http://u01.dlyce.com',
	//url: 'http://127.0.0.1:8001/upload',
	data: {
		id: 'ppa',
		module: 'licence',
		filename: 'A-12-45654512.jpg'
	},
	onProgress: function(e) {
		if (e.lengthComputable) {
            var percent = Math.ceil(e.loaded / e.total * 100);
            console.log(percent);
        }
	},
	onSuccess: function(message) {
		console.log(message);
	},
	onError: function(jqXHR, textStatus, message) {
		console.log(jqXHR);
		console.log(textStatus);
		console.log(message);
	}
});