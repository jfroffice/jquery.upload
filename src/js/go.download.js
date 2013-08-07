console.log('initialize');

var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://127.0.0.1:8001/css/style.css');
xhr.timeout = 5000;

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

xhr.send();
