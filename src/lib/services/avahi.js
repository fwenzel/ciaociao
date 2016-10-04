const child_process = require('sdk/system/child_process');
const file = require('sdk/io/file');
const system = require('sdk/system');

const utils = require('../utils');

const AVAHI_PATH = '/usr/bin/avahi-browse';


/**
 * Can we use avahi-browse here?
 */
function hasAvahi() {
  return file.exists(AVAHI_PATH);
}


/**
 * Shell out avahi-browse.
 */
function startListening() {
  return child_process.spawn(AVAHI_PATH, ['_http._tcp', '--resolve', '--parsable', '--no-db-lookup']);
}


/**
 * Discover local web services through avahi-browse.
 */
function parseAvahi(data, panel) {
  /*
  Valid result looks something like this:

  [...]
  +;eth0;IPv4;My\032Printer;_http._tcp;local
  =;eth0;IPv4;My\032Printer;_http._tcp;local;somehostname.local;192.168.0.1;58819;
  */

  // Fish out instance names.
  var lines = data.split('\n');
  var parsed = [];
  lines.forEach(function(l) {
    if (l.slice(0, 1) !== '=') return;

    var matched = l.split(';');
    if (matched.length < 10) return;

    // Fix ASCII escapes, such as \032 for <space>.
    var name = utils.deEscapify(matched[3]);

    // Build URL.
    var host = 'http://' + matched[6];
    if (matched[8] !== '80') {  // Add port if not default.
      host += ':' + matched[8];
    }

    parsed.push([name, host]);
  });

  return parsed;
}


exports['supported'] = hasAvahi;
exports['startListening'] = startListening;
exports['parse'] = parseAvahi;
