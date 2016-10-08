const avahi = require('../lib/services/avahi');

const RAW_OUTPUT = '\
+;wlan0;IPv4;my-server;_http._tcp;local\n\
+;wlan0;IPv4;MPC\\032client\\032on\\032my-server;_http._tcp;local\n\
=;wlan0;IPv4;my-server;_http._tcp;local;my-server.local;10.13.13.227;80;"path=/storage/"\n\
=;wlan0;IPv4;MPC\\032client\\032on\\032my-server;_http._tcp;local;my-server.local;10.13.13.227;6680;\n\
'.trim();

const EXPECTED = [
  ["my-server", "http://my-server.local"],
  ["MPC client on my-server", "http://my-server.local:6680"]];


exports['test avahi-browse'] = function(assert) {
  let parsed = avahi.parse(RAW_OUTPUT);

  assert.equal(JSON.stringify(parsed), JSON.stringify(EXPECTED), 'Avahi parsing');
}


require('sdk/test').run(exports)
