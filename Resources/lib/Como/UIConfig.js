var // include underscore utility-belt
    _ = require('/lib/Underscore/underscore.min'),

    // user defined UIConfig for UIShortcut
    userConfig = {},

    // Basic UIShortcut public API definition
    factories = [
        /* Shortcut for Titanium.UI.View creation using Ti.UI.createView as factory */
        {name: 'view',              fn: 'View'/*, platform: 'iPhone'*/},

        /* Shortcut for Titanium.UI.ScrollView creation using Ti.UI.createScrollView as factory */
        {name: 'scrolly',           fn: 'ScrollView'},

        /* Shortcut for Titanium.UI.ScrollableView creation using Ti.UI.createScrollableView as factory */
        {name: 'scrollview',        fn: 'ScrollableView'},

        /* Shortcut for Titanium.UI.WebView creation using Ti.UI.createWebView as factory */
        {name: 'webview',           fn: 'WebView'},

        /* Shortcut for Titanium.UI.Label creation using Ti.UI.createLabel as factory */
        {name: 'label',             fn: 'Label'},

        /* Shortcut for Titanium.UI.TextField creation using Ti.UI.createTextField as factory */
        {name: 'textfield',         fn: 'TextField'},

        /* Shortcut for Titanium.UI.TextArea creation using Ti.UI.createTextArea as factory */
        {name: 'textarea',          fn: 'TextArea'},

        /* Shortcut for Titanium.UI.ImageView creation using Ti.UI.createImageView as factory */
        {name: 'image',             fn: 'ImageView'},

        /* Shortcut for Titanium.UI.Window creation using Ti.UI.createWindow as factory */
        {name: 'win',               fn: 'Window'},

        /* Shortcut for Titanium.UI.Button creation using Ti.UI.createButton as factory */
        {name: 'button',            fn: 'Button'},

        /* Shortcut for Titanium.UI.Picker creation using Ti.UI.createPicker as factory */
        {name: 'picker',            fn: 'Picker'},

        /* Shortcut for Titanium.UI.ActivityIndicator creation using Ti.UI.createActivityIndicator as factory */
        {name: 'indicator',         fn: 'ActivityIndicator'},

        /* Shortcut for Titanium.UI.OptionDialog creation using Ti.UI.createOptionDialog as factory */
        {name: 'optdialog',         fn: 'OptionDialog'},

        /* Shortcut for Titanium.UI.Tab creation using Ti.UI.createTab as factory */
        {name: 'tab',               fn: 'Tab'},

        /* Shortcut for Titanium.UI.TabGroup creation using Ti.UI.createTabGroup as factory */
        {name: 'tabgroup',          fn: 'TabGroup'},

        /* Shortcut for Titanium.UI.TableView creation using Ti.UI.createTableView as factory */
        {name: 'tableview',         fn: 'TableView'},

        /* Shortcut for Titanium.UI.TableViewRow creation using Ti.UI.createTableViewRow as factory */
        {name: 'tablerow',          fn: 'TableViewRow'},

        /* Shortcut for Titanium.UI.TableViewSection creation using Ti.UI.createTableViewSection as factory */
        {name: 'tablesection',      fn: 'TableViewSection'},

        /* Shortcut for Titanium.UI.ProgressBar creation using Ti.UI.createProgressBar as factory */
        {name: 'progressbar',       fn: 'ProgressBar'},

        /* Shortcut for Titanium.UI.EmailDialog creation using Ti.UI.createEmailDialog as factory */
        {name: 'email',             fn: 'EmailDialog'},

        /* Shortcut for Titanium.Map.View creation using Ti.Map.createView as factory */
        {name: 'map',               fn: Ti.Map.createView},

        /* Alias of view */
        {name: 'buttonbar',         fn: 'View'}
    ],

    // event aliases
    events = [
        // alias
        {evt: 'tap', orig: 'touchend'},
        {evt: 'taphold', orig: 'longpress'},

        // non alias
        {evt: 'click', orig: 'click'},
        {evt: 'swipe', orig: 'swipe'}
    ];

try { userConfig = require('/app/config/UIConfig'); } catch (msg) {}
_.extend(factories, userConfig.factories || {});
_.extend(factories, userConfig.events || {});

exports.factories = factories;
exports.events = events;