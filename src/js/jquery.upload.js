(function($, undefined) {

	var xhrFileUpload = !!(window.XMLHttpRequestUpload && window.FileReader),
    	xhrFormDataFileUpload = !!window.FormData;

	function uploadOne(url, files, data, index, cb) {

		var xhr = new XMLHttpRequest();
		xhr.open('POST', url);
		//xhr.timeout = 5000;

		xhr.addEventListener('load', function(e) {
			//console.log('load');
			//console.log(e);
		});

		xhr.addEventListener('error', function(e) {
			console.log('error');
			console.log(e);
		});

		xhr.addEventListener('loadstart', function(e) {
			//console.log('loadstart');
			//console.log(e);
		});

		xhr.addEventListener('loadend', function(e) {
			//console.log('loadend');
			//console.log(e);
		});

		xhr.addEventListener('abort', function() {
			console.log('abort');
		});

		xhr.addEventListener('timeout', function() {
			console.log('timeout');
		});

		xhr.addEventListener('progress', function(e) {
			console.log('progress');
			console.log(e);

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
	    return $.makeArray($files.prop('files'));
	}

	$.fn.upload = function(options) {

		console.log(xhrFileUpload);
		console.log(xhrFormDataFileUpload);

		if (!options) {
			return;
		}

		var url = options.url,
			data = options.data;

		if (!url) {
			return;
		}

		$(this).on("change", function(e) {
        	upload(url, getFilesInput($(this)), data ? JSON.stringify(data) : null, 0);
        });
	};

}(jQuery));