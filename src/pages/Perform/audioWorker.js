// web audio worker to control play, pause, next and previous notes

self.addEventListener('message', function(e) {
    self.postMessage(e.data);
  }, false);