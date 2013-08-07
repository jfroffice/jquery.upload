function go() {
	console.log('initialize');

	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'http://127.0.0.1:8001/upload');
	//xhr.timeout = 5000;

	xhr.addEventListener('load', function(e) {
		console.log('load');
		console.log(e);
	});

	xhr.addEventListener('error', function() {
		console.log('error');
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
		if (this.status === 200) {
			console.log('OK');
		} else {
			console.log('err');
		}
	}

	var formData = new FormData();
	formData.append('id', 123456);
	formData.append('param', 'soleil');

	xhr.send(formData);
}


function getParamName(options) {
    var fileInput = $(options.fileInput),
        paramName = options.paramName;
    if (!paramName) {
        paramName = [];
        fileInput.each(function () {
            var input = $(this),
                name = input.prop('name') || 'files[]',
                i = (input.prop('files') || [1]).length;
            while (i) {
                paramName.push(name);
                i -= 1;
            }
        });
        if (!paramName.length) {
            paramName = [fileInput.prop('name') || 'files[]'];
        }
    } else if (!$.isArray(paramName)) {
        paramName = [paramName];
    }
    return paramName;
};


//var array = new Uint8Array([1, 5, 6, 9]);
//xhr.send(array.buffer);


$('#files').on("change", function(e) {
	console.log(e);

	var paramName = getParamName({
		fileInput: '#files',
		paramName: 'file'
	});

	console.log(paramName);
});