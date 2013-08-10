(function($, undefined) {

	function uploadOne(url, file, data, cb) {

		var formData = new FormData();
		if (data) {
			formData.append('data', data);
		}
		formData.append('file', file);

 		// workaround because jqXHR does not expose upload property
		var xhr = function() {
            var xhr = $.ajaxSettings.xhr();
            if (xhr.upload) {
                xhr.upload.addEventListener('progress', function(event) {
                    var percent = 0;
                    var position = event.loaded || event.position; /*event.position is deprecated*/
                    var total = event.total;
                    if (event.lengthComputable) {
                        percent = Math.ceil(position / total * 100);
                    }
                    console.log(percent);
                }, false);
            }
            return xhr;
        };

		$.ajax({
			url: url,
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			cache: false,
			xhr: xhr,
			success: function(response) {
				cb(null, response);
			},
			error: function(jqXHR, textStatus, errorMessage) {
				cb(errorMessage, textStatus);
			}
		});
	}

	function upload(url, files, data, i) {

		if (i === files.length) {
			return;
		}

		uploadOne(url, files[i], data, function(err, response) {
			if (err) {
				console.log(err);
				console.log(response);
			} else {
				upload(url, files, data, i+1);
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

		$(this).on("change", function(e) {
			upload(url, getFilesInput($(this)), data ? JSON.stringify(data) : null, 0);
        });
	};

}(jQuery));