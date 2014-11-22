(function() {

var content = document.getElementById('list');

function showResults(msg) {
  if (!msg.length) {
    content.textContent = 'No services found!'
    return;
  }

  content.textContent = '';
  var ul = document.createElement('ul');
  content.appendChild(ul);

  for (var entry of msg) {
    var li = document.createElement('li');

    var a = document.createElement('a');
    a.textContent = entry[0];
    a.setAttribute('href', entry[1]);

    li.appendChild(a);
    ul.appendChild(li);
  }
}

self.port.on('results', showResults);

content.addEventListener('click', function(e) {
  e.preventDefault();
  if (e.target.tagName !== 'A') return;

  self.port.emit('click', e.target.href);
});

})();
