(function($, undefined) {

	// TODO test de non compatibilité IE9, etc...
	var onProgress;

	function uploadOne(url, file, data, cb) {

		var formData = new FormData();
		if (data) {
			formData.append('data', data);
		}
		formData.append('file', file);

		$.ajax({
			url: url,
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			cache: false,
			xhr: function() { // workaround because jqXHR does not expose upload property
	            var xhr = $.ajaxSettings.xhr();
	            if (xhr.upload && onProgress) {
	                xhr.upload.addEventListener('progress', function(e) {
	                	onProgress(e);
	                }, false);
	            }
	            return xhr;
	        },
			success: function(message) {
				cb(null, null, message);
			},
			error: function(jqXHR, textStatus, message) {
				cb(jqXHR, textStatus, message);
			}
		});
	}

	function upload(url, files, data, i) {
		uploadOne(url, files[i], data, function(jqXHR, textStatus, message) {
			if (jqXHR) {
				onError && onError(jqXHR, textStatus, message);
			} else {
				if ((i+1) === files.length) {
					onSuccess && onSuccess(message);
				} else {
					upload(url, files, data, i+1);
				}
			}
		});
	}

	function getFilesInput($files) {
		return $.makeArray($files.prop('files'));
	}

	$.fn.upload = function(options) {

		if (!options) {
			return;
		}

		var url = options.url,
			data = options.data;

		if (!url) {
			return;
		}

		onProgress = options.onProgress,
		onSuccess = options.onSuccess,
		onError = options.onError;

		$(this).on("change", function(e) {
			upload(url, getFilesInput($(this)), data ? JSON.stringify(data) : null, 0);
        });
	};

}(jQuery));