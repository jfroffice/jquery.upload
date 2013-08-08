(function($, undefined) {

	function uploadOne(url, files, data, index, cb) {

		var xhr = new XMLHttpRequest();
		xhr.open('POST', url);
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
		};

		var formData = new FormData();
		if (data) {
			formData.append('data', data);
		}
		formData.append('file', files[index]);

		xhr.send(formData);
	}

	function upload(url, files, data, i) {

		if (i === files.length) {
			return;
		}

		uploadOne(url, files, data, i, function(status) {
			if (status === 200) {
				upload(url, files, data, i+1);
			} else {
				alert('ERROR');
			}
		});
	}

	function getFilesInput($files) {

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

	$.fn.upload = function(options) {

		if (!options) {
			return;
		}

		var url = options.url,
			data = options.data;

		if (!url) {
			throw new Error("url is not defined");
			return;
		}

		$(this).on("change", function(e) {
        	upload(url, getFilesInput($(this)), data ? JSON.stringify(data) : null, 0);
        });
	};

}(jQuery));