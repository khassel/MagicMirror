# Breaking changes in upcoming April release

- We've structurally reorganized the system to strictly separate user data from repository data.
  - The `modules` folder now contains only user data in the form of third-party modules. The standard modules included with MagicMirror² have been moved to a separate directory, `defaultmodules`.
  - The `css` folder now contains only data belonging to the repository. The previously located `custom.css` file has been moved to the `config` folder. This happens automatically the first time you start the new version of MagicMirror².

- The way `config.js` is loaded has changed. This should not affect standard users. However, it may have side effects for third-party modules. The client (browser) no longer loads `config.js` directly from the file system but via the web server (`/config`).

- Support for `config.js.template` files has been removed. Instead, `config.js` now supports curly braced bash variables. Users who previously used a template must copy its contents into `config.js` once.

- If MagicMirror² is running as an Electron application:
  - We've changed the default window manager in the startup script from X11 to Wayland. Most Raspberry Pi OS users are likely now using `trixie` or `bookworm`, which already ship with Wayland as the default. Running `node --run start` is now equivalent to `node --run start:wayland`. Users still using X11 must now switch to `node --run start:x11`.
  - The kioskmode, which has been marked as deprecated for 10 years, has been removed. If the `kiosksmode` parameter is set in `config.js`, it can be removed; it is now ineffective. You may need to adjust `electronOptions` parameters if you used `kiosksmode` before.
