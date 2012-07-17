Como - a Titanium Appcelerator MVC Framework
============================================

Just another approach to simplify appcelerator app development,
 integrated with `joli.js` to persist data model using local DB and underscore.js as utility.

### v2.0.1

**required:**

- joli.js - Local DB ORM
- underscore.js - JS Utility-Belt

Getting Started
===============

Installation
------------

The simplest way to start using Como is just copy `app` & `lib` directory and also `app.js` into your project,
 if you would like to use the localization feature then you also have to copy the `i18n` directory.

Directory Structure
-------------------

The directory structure of Como is as follows:

    project_root
        |- i18n                 <- Localization sources
        |- Resources
            |- app
            |   |- config       <- Configuration sources
            |   |- controllers  <- Controller sources
            |   |- models       <- Model sources
            |   |- views        <- View sources
            |   |- main.js      <- Application bootstrap
            |
            |- lib
            |   |- Como         <- Core Como Library
            |   |- Joli         <- Joli ORM Library
            |   |- Underscore   <- Underscore js-utility-belt Library
            |
            |- app.js           <- Appcelerator bootstrap

Writing Views
-------------

The main view required by `main.js` is `app/views/MainWindow.js` so we will need this view as our main window.
We need this MainWindow defined as CommonJS module.

`app/views/MainWindow.js`
```js
module.exports = function (Como) {

    var UI = Como.loadUI();

    var self = new UI.win({
        fullscreen : true,
        backgroundColor : '#bada55',
        title : 'Main Window',
        navBarHidden : false,
        exitOnClose : true
    });

    return self;
};
```

To create a Window we can use UI shortcut object factory from `Como.loadUI()` that will return the UI Shortcut factory.
Other components also available such as `Ti.UI.ScrollView, Ti.UI.Button, Ti.UI.Label, etc.`. Please refer `lib/Como/UIShortcut.js`.

Writing Controllers
-------------------

To create a controller just add a `.js` in `app/controllers`. Components created using UIShortcut factory are action aware.
It means that we can straight pass action expression like this:

```js
win.click('Controller/action', param1, 'param2');
```

To define a Controller we need to use CommonJS module. We will pass Como in Contruction function and we will return the public API

`app/controllers/Test.js`
```js
module.exports = function (Como) {

    var doBtnClick = function (p) {

        // get the source of the event
        var source = this;

        alert('It's Clicked! p is ' + p + ' & xyz is ' + source.xyz);
    };

    // Public API
    return {
        doBtnClick : doBtnClick
    };
};
```

We can then use the public API of our Action in Controller to act as event handler of our view.
We can also pass parameters both via action parameters and component's custom attributes.

```js
var btn = new UI.button({
    backgroundColor: '#272e12',
    color: '#fff',
    title: 'Click Me'
    width: '100dp',
    height: '40dp',
    bottom: '20dp',
    xyz: 'abc'          // custom attribute
});

// set click to doBtnClick action which expects a String paramter
btn.click('Test/doBtnClick', 'xxx');
```

### Use Action with my own custom events ?

Yes it is possible to use action API with other events such as your own trigger custom events.
Como has an API to get the Controller's Action using `Como.applyAction()` this function will return the actual Action function.


```js
var handler = Como.applyAction('Test/doFlash');

btn.addEventListener('flash', handler);
```

### Custom Events added by UIShortcut

These events are added by UIShortcut so all components created using UIShortcut Factory will have these custom events.
And they are aware of action expression.

`tap` the same as `touchend` in native appcelerator event.
`click' the same as `click` in native appcelerator event.
`taphod` the same as `longpress` in native appcelerator event.
`swipe` the same as `swipe` in native appcelerator event.

Change Log
==========

`[16/07/12]`

- Add parameter on extended event assignment method to remove method before add new one
- Move remote base URL into configuration /app/config/app.js
- Use new backend login script

`[13/07/12]`

- Restructure baseline code to follow CommonJS pattern.

`[03/07/12]`


- Add download file demo using custom progress bar UI.
- Wrap ajax download/upload callback into ondatatream/onsendstream
- Add more UI factory on UIShortcut.js

`[02/07/12]`

- Fix to avoid Closure while applying action handler function.
- Move utility Function in Como/App.js into Como/Utils.js.

`[29/06/12]`

- Add Utility Module in /lib/Como/Utils.js to add HTTPClient utility.

`[26/06/12]`

- Move tablet form factor to config, Remove unused image folder.

`[25/06/12]`

- Initial Release of Como MVC Framework.

---
Como is *Copyright* &copy; 2012 by *AppsCo.biz*
Lead Developer: Imam &lt;imam@xybase.com&gt;

---
Stuff our legal folk make us say:

Appcelerator, Appcelerator Titanium and associated marks and logos are
trademarks of Appcelerator, Inc.

Titanium is *Copyright* &copy; 2008-2012 by *Appcelerator, Inc.* All Rights Reserved.

Titanium is licensed under the Apache Public License (Version 2). Please
see the LICENSE file for the full license.

