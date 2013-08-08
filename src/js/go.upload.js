var URL_UPLOAD = 'http://127.0.0.1:8001/upload';

function uploadOne(files, data, index, cb) {
	console.log('initialize');

	var xhr = new XMLHttpRequest();
	xhr.open('POST', URL_UPLOAD);
	//xhr.timeout = 5000;

	xhr.addEventListener('load', function(e) {
		console.log('load');
		console.log(e);
	});

	xhr.addEventListener('error', function(e) {
		console.log('error');
		console.log(e);
	});

	xhr.addEventListener('loadstart', function(e) {
		console.log('loadstart');
		console.log(e);
	});

	xhr.addEventListener('loadend', function(e) {
		console.log('loadend');
		console.log(e);
	});

	xhr.addEventListener('abort', function() {
		console.log('abort');
	});

	xhr.addEventListener('timeout', function() {
		console.log('timeout');
	});

	xhr.addEventListener('progress', function(e) {
		console.log(e);
		console.log('progress');

		if (e.lengthComputable) {
			var progress = (e.loaded / e.total) * 100;
			console.log(progress);
		}
	});

	xhr.onload = function() {
		console.log('onload function');
		console.log(this);
		cb(this.status);
	}

	var formData = new FormData();
	if (data) {
		formData.append('data', data);
	}
	formData.append('file', files[index]);

	xhr.send(formData);
}

function getFilesInput($files) {

	console.log($files.prop('files'));

    var files = $.makeArray($files.prop('files')),
        value;


    if (!files.length) {
        value = $files.prop('value');
        if (!value) {
            return [];
        }
        // If the files property is not available, the browser does not
        // support the File API and we add a pseudo File object with
        // the input value as name with path information removed:
        files = [{name: value.replace(/^.*\\/, '')}];
    } else if (files[0].name === undefined && files[0].fileName) {
        // File normalization for Safari 4 and Firefox 3:
        $.each(files, function (index, file) {
            file.name = file.fileName;
            file.size = file.fileSize;
        });
    }
    return files;
}

function upload(files, data, i) {

	if (i === files.length) {
		return;
	}

	uploadOne(files, data, i, function(status) {
		if (status === 200) {
			upload(files, data, i+1);
		} else {
			alert('ERROR');
		}
	});
}

$('#files').on("change", function(e) {

	var data = {
		id: 'my_id',
		module: 'my_module',
		filename: 'filename.jpg'
	};

	upload(getFilesInput($(this)), JSON.stringify(data), 0);
});