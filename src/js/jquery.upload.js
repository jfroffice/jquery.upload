(function($, undefined) {

	// TODO test compatibility IE9, etc...
	var progress, failed, done, start, asyncData;

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
				if (xhr.upload && progress) {
					xhr.upload.addEventListener('progress', function(e) {
						progress(e);
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
				failed && failed(jqXHR, textStatus, message);
			} else {
				if ((i+1) === files.length) {
					done && done(message);
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

		start = options.start;
		progress = options.progress;
		done = options.done;
		failed = options.failed;
		asyncData = options.asyncData;

		$(this).on("change", function(e) {
			if (asyncData) {
				data = asyncData();
			}

			start && start();
			upload(url, getFilesInput($(this)), data ? JSON.stringify(data) : null, 0);
        });
	};

}(jQuery));