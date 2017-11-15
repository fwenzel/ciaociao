# ![](https://raw.githubusercontent.com/fwenzel/ciaociao/master/globe.png) Ciaociao Add-on
by Fred Wenzel ``<code@wenzel.io>``

Ciaociao (formerly Zerofox) is a Bonjour/Zeroconf service discovery add-on for Firefox. It adds a button to the toolbar that'll show you known web servers around your local network -- for instance, your printer or router might publish their config pages that way.

![](https://raw.githubusercontent.com/fwenzel/ciaociao/master/screenshot.png)

## Known Caveats
Ciaociao currently **only works on Mac OS X and Linux**, because it uses the ``dns-sd`` or ``avahi-browse`` utilities to discover the services in question. In the future, if I can find out how, I'll be happy to add Windows support.

## Installing
Ciaociao is available on the [Mozilla Add-ons website](https://addons.mozilla.org/en-US/firefox/addon/ciaociao/). You can install it with Firefox by simply pressing the Install button there.

## Contributing
Ciaociao is open source. If you'd like to contribute, feel free to open or comment on an [Issue on Github](https://github.com/fwenzel/ciaociao/issues). Pull requests welcome!

## Acknowledgments
Thanks to:

* Last Call Media for their [World Issues Iconset](https://www.iconfinder.com/iconsets/world-issues), where Ciaociao's globe icon is from.

## License
This is free software, &copy; 2014-today Fred Wenzel and licensed under an MIT license. For more information, read the file ``LICENSE``.
