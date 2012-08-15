Change Log
==========

`[15/08/2012]`

- Fix bug when ajax with `dataType: 'plain'` not to parse as JSON object.

`[03/08/2012]`

- Update Utils.js to add deep object extend function

`[02/08/2012]`

- Recapture device width and height in Como.device upon device change orientation.
- Recalculate tablet definition when orientation change.
- Throw error when loading Models but no definition in config.

`[26/07/12]`

- Move UI Factories config out of UIShortcut.js into UIConfig.js and provide user defined extension to it.

`[25/07/12]`

- Provide addAll method to all UI created with UIShortcut module to add array of child elements into parent elements.

`[23/07/12]`

- Add on method as shortcut for addEventListener with ability of action path aware.
- Restructure UIShortcut for readibility.

`[17/07/12]`

- Move complete sample usage to another project.
- Fix to be able to put model configs as Array of String.

`[16/07/12]`

- Add parameter on extended event assignment method to remove method before add new one.
- Move remote base URL into configuration `/app/config/app.js`.
- Use new backend login script.

`[13/07/12]`

- Restructure baseline code to follow CommonJS pattern.

`[03/07/12]`

- Add download file demo using custom progress bar UI.
- Wrap ajax download/upload callback into ondatatream/onsendstream.
- Add more UI factory on `UIShortcut.js`.

`[02/07/12]`

- Fix to avoid Closure while applying action handler function.
- Move utility Function in `Como/App.js` into `Como/Utils.js`.

`[29/06/12]`

- Add Utility Module in `/lib/Como/Utils.js` to add `HTTPClient` utility.

`[26/06/12]`

- Move tablet form factor to config and Remove unused image folder.

`[25/06/12]`

- Initial Release of Como MVC Framework.