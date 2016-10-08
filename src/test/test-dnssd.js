const dnssd = require('../lib/services/dnssd');

const RAW_OUTPUT = '\
Browsing for _http._tcp\n\
DATE: ---Fri 01 Jan 2016---\n\
14:03:59.861  ...STARTING...\n\
\n\
; To direct clients to browse a different domain, substitute that domain in place of \'@\'\n\
lb._dns-sd._udp                                 PTR     @\n\
\n\
; In the list of services below, the SRV records will typically reference dot-local Multicast DNS names.\n\
; When transferring this zone file data to your unicast DNS server, you\'ll need to replace those dot-local\n\
; names with the correct fully-qualified (unicast) domain name of the target host offering the service.\n\
\n\
_http._tcp                                      PTR     My\\032Printer._http._tcp\n\
My\\032Printer._http._tcp                        SRV     0 0 80 printer.local. ; Replace with unicast FQDN of target host\n\
My\\032Printer._http._tcp                        TXT     ""\n\
\n\
_http._tcp                                      PTR     Some\\032Software._http._tcp\n\
Some\\032Software._http._tcp                     SRV     0 0 57220 server1.local. ; Replace with unicast FQDN of target host\n\
Some\\032Software._http._tcp                     TXT     ""\n\
\n\
_http._tcp                                      PTR     Some\\032Software._http._tcp\n\
More\\032Software._http._tcp                     SRV     0 0 57220 server2.local. ; Replace with unicast FQDN of target host\n\
More\\032Software._http._tcp                     TXT     ""\n\
'.trim();

const EXPECTED = [
  ["My Printer", "http://printer.local"],
  ["Some Software","http://server1.local:57220"],
  ["More Software","http://server2.local:57220"]];


exports['test dnssd'] = function(assert) {
  let parsed = dnssd.parse(RAW_OUTPUT);

  assert.equal(JSON.stringify(parsed), JSON.stringify(EXPECTED), 'DNSSD parsing');
}


require('sdk/test').run(exports)
