var // include underscore utility-belt
    _ = require('/lib/Underscore/underscore.min'),

    // Basic UIShortcut public API definition
    uiFactories = [
        /* Shortcut for Titanium.UI.View creation using Ti.UI.createView as factory */
        {name: 'view',              fn: 'View'/*, platform: 'iPhone'*/},

        /* Shortcut for Titanium.UI.ScrollView creation using Ti.UI.createScrollView as factory */
        {name: 'scrolly',           fn: 'ScrollView'},

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

        /* Shortcut for Titanium.UI.TableView creation using Ti.UI.createTableView as factory */
        {name: 'tableview',         fn: 'TableView'},

        /* Shortcut for Titanium.UI.TableViewRow creation using Ti.UI.createTableViewRow as factory */
        {name: 'tablerow',          fn: 'TableViewRow'},

        /* Shortcut for Titanium.UI.TableViewSection creation using Ti.UI.createTableViewSection as factory */
        {name: 'tablesection',      fn: 'TableViewSection'},

        /* Shortcut for Titanium.UI.ProgressBar creation using Ti.UI.createProgressBar as factory */
        {name: 'progressbar',       fn: 'ProgressBar'}
    ],

    // event aliases
    events = [
        // alias
        {evt: 'tap', orig: 'touchend'},
        {evt: 'taphold', orig: 'longpress'},

        // non alias
        {evt: 'click', orig: 'click'},
        {evt: 'swipe', orig: 'swipe'}
    ],

    /**
     * Function Titanium.UI factory wrapper
     * @param {Function} factory the factory function to create the UI
     * @return {Object} the Titanium.UI instance produce by factory function
     */
    createUI = function(factory, Como) {
        "use strict";
        var /**
             * Generate a reusable function that will serve as a template of event handler
             * @param {Mixed} evtName the event name or a handler (function) itself
             * @return {Function} the Function generated for attached to the event hanler
             */
            handlerFn = function (evtName) {
                return function () {
                    var remove = (typeof arguments[0]) === 'boolean',
                        inline = (typeof arguments[remove ? 1 : 0]) === 'function',
                        applyFn = inline ? remove ? arguments[1] : arguments[0] : function () {},
                        // convert to plain Array object
                        args = Array.prototype.slice.call(arguments).splice(remove ? 1 : 0);

                    if (!inline) {
                        if (!Como) {
                            throw 'Undefined Como Object or Not using Como framework.';
                        }
                        // the event handler for the specified event name
                        applyFn = Como.applyAction.apply(this, args);
                    }

                    // remove first before add event listener
                    if (remove && arguments[0]) {
                        this.removeEventListener(evtName, applyFn);
                    }
                    // add listener of event name with the specified handler
                    this.addEventListener(evtName, applyFn);
                };
            },

            /**
             * Translates event name into Titanium SDK compatible event names
             * @param {String} evt event name to be translated into
             * @return {String} event name compatible on Titanium SDK
             */
            compatEventName = function (evt) {
                // find the real event name
                var trans = _.find(events, function (e) { return e.evt === evt; });
                return trans ? trans.orig : evt;
            },

            /**
             * Add elements from an array
             * @param {Array} tiEls elements of Ti.UI as Array
             */
            addAll = function (tiEls) {
                var ui = this,
                    // generic function to add a single element
                    add = function(el) {
                        ui.add(el);
                    };

                // add array
                if (_.isArray(tiEls)) {
                    _.each(tiEls, function (el) { add(el); });
                }
                // add Ti Object
                else { add(tiEls); }
            },

            /**
             * Generate a reusable function as extension of addEventListener function
             * @return {Function} the event handler for a spesific event name
             */
            onHandler = function () {
                var args = Array.prototype.slice.call(arguments).splice(1),
                    // event name is the first argument
                    evt = compatEventName(arguments[0]);

                // return the event handler
                return handlerFn(evt).apply(this, args);
            },

            /**
             * Extend base UI object with useful stuffs
             * @return {Object} the extend UI Object
             */
            extendUI = function (Como) {
                var ui = this;

                // generic handler as shortcut to addEventListener
                ui.on = onHandler;

                // add elements from array
                ui.addAll = addAll;

                // extend with event function as event handler shortcut
                _.each(events, function (e) { ui[e.evt] = handlerFn.apply(ui, [e.orig]); });

                return ui;
            },

            /**
             * Building Ti.UI factory from base element and platform
             * @param {Mixed} tiElement the element name or a factory (function) itself
             * @param {String} platform the platform for the factory function
             * @return {Function} the UI factory function
             */
            buildFactory = function (tiElement, platform) {
                var // if passed a Titanium Object
                    TiFactory = (typeof tiElement) === 'function' ? tiElement :
                         // build Titanium Proxy Object creation call
                        (platform ? Ti.UI[platform]['create'+tiElement] : Ti.UI['create'+tiElement]);

                // return the Factory
                return TiFactory;
            },

            /* finalize UI factory */
            TiFactory = buildFactory(factory.fn, factory.platform || false),

            /**
             * Shortcut based on factory creation of Titanium.UI.x
             * @return {Object} the UI Object
             */
            fn = function(opts, tapAct/*, tapArgs*/) {
                var // create it
                    ui = TiFactory(opts),
                    // grab the rest of the arguments
                    args = Array.prototype.slice.call(arguments).splice(1);

                // extend it
                ui = extendUI.apply(ui, args);
                // apply inline tap events
                if (tapAct) { ui.tap.apply(ui, args); }

                // return the UI object
                return ui
            };

        // Provide some basic currying to the user
        return fn;
    },

    // Custom & Composite UI declare inside here
    uiComposite = {},

    // constructor
    UIShortcut = function (Como) {
        "use strict";
        if (!Como) { throw 'Como reference is undefined or null!'; }
        var // Public API
            uiBuilder = {};

        _.each(uiFactories, function (f) { uiBuilder[f.name] = createUI(f, Como); });
        return _.extend({}, uiBuilder, uiComposite);;
    };

/**
 * UIShortcut Initializer
 */
module.exports = (function () {
    "use strict";
    return {
        init: function (Como) { return new UIShortcut(Como); }
    };
}());