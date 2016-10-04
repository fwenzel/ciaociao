var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require('sdk/panel');
var self = require('sdk/self');
var tabs = require('sdk/tabs');

var zeroconf = require('./zeroconf');


exports.main = function(options, callbacks) {
  // On a platform with neither dnssd nor avahi-browse, we're SOL.
  if (!zeroconf.isSupportedPlatform()) {
    return;
  }


  /** Toolbar button. */
  var button = ToggleButton({
    id: 'ciaociao-btn',
    label: 'Ciaociao',
    icon: {
      '16': self.data.url('img/icon-16.png'),
      '32': self.data.url('img/icon-32.png'),
      '48': self.data.url('img/icon-48.png'),
      '64': self.data.url('img/icon-64.png')
    },
    contextMenu: true,
    onChange: openPanel
  });

  /** Panel showing the service list. */
  var panel = panels.Panel({
    contentURL: self.data.url('www/panel.html'),
    contentScriptFile: self.data.url('js/panel.js'),
    contentStyleFile: self.data.url('css/panel.css'),
    onHide: function() {
      // Unpress toggle button.
      button.state('window', {checked: false});
    }
  });

  /**
   * Open a clicked link in the panel in a new tab.
   */
  panel.port.on('click', function(msg) {
    tabs.open(msg);
    panel.hide();
  });


  /**
   * Show panel with (previously discovered) services.
   */
  function openPanel(state) {
    if (!state.checked) return;

    panel.port.emit('flush');
    zeroconf.discover(panel);

    panel.show({
      position: button
    });
  }

}
