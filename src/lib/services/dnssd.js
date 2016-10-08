const child_process = require('sdk/system/child_process');
const file = require('sdk/io/file');
const system = require('sdk/system');

const utils = require('../utils');

const DNSSD_PATH = '/usr/bin/dns-sd';


/**
 * Can we use DNNSD here?
 */
function hasDnssd() {
  return system.platform === 'darwin' && file.exists(DNSSD_PATH);
}


/**
 * Shell out to a DNSSD instance to start listening.
 */
function startListening() {
  return child_process.spawn(DNSSD_PATH, ['-Z', '_http._tcp']);
}


/**
 * Discover local web services through dns-sd.
 */
function parseDnssd(data) {
  /*
  Valid result looks something like this:

  [...]
  My\032Printer._http._tcp                 SRV     0 0 80 somehostname.local. ; Replace with unicast FQDN of target host
  */

  // Fish out instance names.
  let lines = data.split('\n');
  let hostmatch = /^(\S+)\._http\._tcp\s+SRV\s+\d \d (\d+) (\S+)\. ;.*/
  let parsed = [];
  lines.forEach(function(l) {
    let matched = l.match(hostmatch);
    if (!matched) return;

    // Fix ASCII escapes, such as \032 for <space>.
    let name = utils.deEscapify(matched[1]);

    // Build URL.
    let host = 'http://' + matched[3];
    if (matched[2] !== '80') {  // Add port if not default.
      host += ':' + matched[2];
    }

    parsed.push([name, host]);
  });

  return parsed;
}


exports['supported'] = hasDnssd;
exports['startListening'] = startListening;
exports['parse'] = parseDnssd;
