var timers = require('sdk/timers');

var service = null;  // Will detect the right library below.


const SERVICES = ['dnssd', 'avahi'];


/**
 * Does this platform have a tool for us to shell out to?
 */
function isSupportedPlatform() {
  if (service) return !!service;

  for (let t of SERVICES) {
    let svcModule = require('./services/' + t);
    if (svcModule.supported()) {
      service = svcModule;
      break;
    }
  }

  return !!service;
}


/**
 * Spawn and parse discovery process.
 */
function discover(panel) {
  if (!isSupportedPlatform()) return;

  // Shell out to listener service.
  let listener = service.startListening();

  // Don't let this run longer than a few seconds.
  // TODO kill this when the panel is closed.
  timers.setTimeout(function() {
    try {
      listener.kill();
    } catch(e) {}
  }, 5000);

  listener.stdout.on('data', function(data) {
    let parsed = service.parse(data);
    parsed.forEach(function(result) {
      panel.port.emit('result', result);
    });
  });

  listener.on('close', function() {
    panel.port.emit('finish');
  });
}


exports['discover'] = discover;
exports['isSupportedPlatform'] = isSupportedPlatform;
