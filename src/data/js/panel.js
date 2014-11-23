(function() {

var content = document.getElementById('list');


/** Empty list. */
function flush() {
  content.textContent = 'Searching...';
}

/** Display a single result [name, url] */
function showResult(msg) {
  var ul = document.querySelector('#list ul');
  if (!ul) {
    content.textContent = '';
    var ul = document.createElement('ul');
    content.appendChild(ul);
  }

  var li = document.createElement('li');

  var a = document.createElement('a');
  a.textContent = msg[0];
  a.setAttribute('href', msg[1]);

  li.appendChild(a);
  ul.appendChild(li);
}

/** We're done. If nothing was found, say so. */
function finish() {
  if (!document.querySelector('li')) {
    content.textContent = 'No services found!';
  }
}


content.addEventListener('click', function(e) {
  e.preventDefault();
  if (e.target.tagName !== 'A') return;

  self.port.emit('click', e.target.href);
});

self.port.on('finish', finish);
self.port.on('flush', flush);
self.port.on('result', showResult);

})();
