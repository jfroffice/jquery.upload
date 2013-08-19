jquery.upload CORS plugin
=========================

this plugin allow to upload file to CORS server.

Multiple events might be listen as start, failed, progress, done.

Browser supported
-----------------
- IE10+
- Chrome 28+
- Firefox 22+

Browser not supported
---------------------
- IE9 
- Safari 5.1.7 (windows)
(Cause FormData & CORS is not fully supported)

Dependency
----------
```
<script src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
```

Installation
------------
```
<script src="/js/jquery.upload.js" />
```

Usage
-----
in your DOM.
```
<input type="file" id="files" name="files[]">
```
and in your JS file.
```
$('#files').upload({
    url: 'http://u01.dlyce.com',
    start: function() {
      console.log('starting');
    },
    asyncData: function() {
        return {
            id: 'my_id',
            module: 'my_module'
        };
    },
    progress: function(e) {
        if (e.lengthComputable) {
            var percent = Math.ceil(e.loaded / e.total * 100);
            console.log(percent);
        }
    },
    done: function(resp) {
        $('body').append($('<img/>').attr('src', resp.url + '/256'));
    },
    failed: function(jqXHR, textStatus, message) {
        console.log(jqXHR);
        console.log(textStatus);
        console.log(message);
    }
});
```

Parameters
----------
- ```url``` of CORS upload server
- ```start``` function callback on start
- ```asyncData``` function callback before starting to add additionnal data sent with your files uploaded
- ```progress``` function callback when upload progress
- ```done``` function callback when it's done
- ```failed``` function callback when it's failed
