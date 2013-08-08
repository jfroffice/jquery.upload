$('#files').upload({
	url: 'http://127.0.0.1:8001/upload',
	data: {
		id: 'my_id',
		module: 'my_module',
		filename: 'filename.jpg'
	}
});