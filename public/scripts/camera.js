// This is the edited version of code from:
// https://github.com/ebidel/html5demos/blob/master/html5-demos.appspot.com/static/getusermedia/record-user-webm.html

$(document).ready(function (){  
  (function(exports) {

    exports.URL = exports.URL || exports.webkitURL;

    exports.requestAnimationFrame = exports.requestAnimationFrame ||
        exports.webkitRequestAnimationFrame || exports.mozRequestAnimationFrame ||
        exports.msRequestAnimationFrame || exports.oRequestAnimationFrame;

    exports.cancelAnimationFrame = exports.cancelAnimationFrame ||
        exports.webkitCancelAnimationFrame || exports.mozCancelAnimationFrame ||
        exports.msCancelAnimationFrame || exports.oCancelAnimationFrame;

    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;

    var ORIGINAL_DOC_TITLE = document.title;
    var video = $('video');
    var canvas = document.createElement('canvas'); // offscreen canvas.
    var rafId = null;
    var startTime = null;
    var endTime = null;
    var frames = [];

    function $(selector) {
      return document.querySelector(selector) || null;
    }

    function toggleActivateRecordButton() {
      var b = $('#record-me');
      b.textContent = b.disabled ? 'Record' : '2. Recording...';
      b.classList.toggle('recording');
      b.disabled = !b.disabled;
    }

    function turnOnCamera(e) {
      e.target.disabled = true;
      $('#record-me').disabled = false;

      video.controls = false;

      var finishVideoSetup_ = function() {
        // Note: video.onloadedmetadata doesn't fire in Chrome when using getUserMedia so
        // we have to use setTimeout. See crbug.com/110938.
        setTimeout(function() {
          video.width = 320;//video.clientWidth;
          video.height = 240;// video.clientHeight;
          // Canvas is 1/2 for performance. Otherwise, getImageData() readback is
          // awful 100ms+ as 640x480.
          canvas.width = video.width;
          canvas.height = video.height;
        }, 1000);
      };

      navigator.getUserMedia({video: true, audio: true}, function(stream) {
        video.src = window.URL.createObjectURL(stream);
        finishVideoSetup_();
      }, function(e) {
        alert('Fine, you get a movie instead of your beautiful face ;)');

        video.src = 'Chrome_ImF.mp4';
        finishVideoSetup_();
      });
    };

    function record() {
      var elapsedTime = $('#elasped-time');
      var ctx = canvas.getContext('2d');
      var CANVAS_HEIGHT = canvas.height;
      var CANVAS_WIDTH = canvas.width;

      frames = []; // clear existing frames;
      startTime = Date.now();

      toggleActivateRecordButton();
      $('#stop-me').disabled = false;

      function drawVideoFrame_(time) {
        rafId = requestAnimationFrame(drawVideoFrame_);

        ctx.drawImage(video, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        document.title = 'Recording...' + Math.round((Date.now() - startTime) / 1000) + 's';

        // Read back canvas as webp.
        //console.time('canvas.dataURL() took');
        var url = canvas.toDataURL('image/webp', 1); // image/jpeg is way faster :(
        //console.timeEnd('canvas.dataURL() took');
        frames.push(url);
     
        // UInt8ClampedArray (for Worker).
        //frames.push(ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT).data);

        // ImageData
        //frames.push(ctx.getImageData(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT));
      };

      rafId = requestAnimationFrame(drawVideoFrame_);
    };

    function stop() {
      cancelAnimationFrame(rafId);
      endTime = Date.now();
      $('#stop-me').disabled = true;
      document.title = ORIGINAL_DOC_TITLE;

      toggleActivateRecordButton();

      console.log('frames captured: ' + frames.length + ' => ' +
                  ((endTime - startTime) / 1000) + 's video');

      embedVideoPreview();
    };

    function embedVideoPreview(opt_url) {
      var url = opt_url || null;
      var video = $('#video-preview video') || null;
      var downloadLink = $('#video-preview a[download]') || null;
      var uploadLink = $('#video-preview a[upload]') || null;

      if (!video) {
        video = document.createElement('video');
        video.autoplay = true;
        video.controls = true;
        video.loop = true;
        //video.style.position = 'absolute';
        //video.style.top = '70px';
        //video.style.left = '10px';
        video.style.width = canvas.width + 'px';
        video.style.height = canvas.height + 'px';
        $('#video-preview').appendChild(video);
        console.log("whatttttt"); 
        downloadLink = document.createElement('a');
        downloadLink.download = 'capture.webm';
        downloadLink.textContent = '[ 3. download video ]';
        downloadLink.title = 'Download your .webm video';
        uploadLink = document.createElement('a');
        uploadLink.textContent = '[ 4. get evaluated! ]';
        uploadLink.href = '/mechturk';
        var links = document.createElement('div');
        links.appendChild(downloadLink);
        links.appendChild(uploadLink);
        links.id='links';

        $('#addTo').appendChild(links);

      } else {
        window.URL.revokeObjectURL(video.src);
      }

      // https://github.com/antimatter15/whammy
      // var encoder = new Whammy.Video(1000/60);
      // frames.forEach(function(dataURL, i) {
      //   encoder.add(dataURL);
      // });
      // var webmBlob = encoder.compile();

      if (!url) {
        var webmBlob = Whammy.fromImageArray(frames, 1000 / 60);
        url = window.URL.createObjectURL(webmBlob);
      }

      video.src = url;
      downloadLink.href = url;
    }

    function initEvents() {
      $('#camera-me').addEventListener('click', turnOnCamera);
      $('#record-me').addEventListener('click', record);
      $('#stop-me').addEventListener('click', stop);
    }

    initEvents();
    exports.$ = $;

  })(window);

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-22014378-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
})