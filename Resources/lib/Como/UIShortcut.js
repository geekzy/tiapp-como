var // include underscore utility-belt
    _ = require('/lib/Underscore/underscore.min'),

    // include UI Factories and Events Config
    uiConfig = require('/lib/Como/UIConfig'),

    // Basic UIShortcut public API definition
    uiFactories = uiConfig.factories,

    // event aliases
    events = uiConfig.events,

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
            buildFactory = function (f) {
                // protect argument
                if ((typeof f) === 'function') { var cfg = {}; cfg.fn = f; f = cfg; }
                var // if already passed a Titanium UI Factory
                    TiFactory = (typeof f.fn) === 'function' ? f.fn :
                         // build Titanium Proxy Object creation call
                        (f.platform ? Ti.UI[f.platform]['create'+f.fn] : Ti.UI['create'+f.fn]);

                // return the Factory
                return TiFactory;
            },

            /* finalize UI factory */
            TiFactory = buildFactory(factory),

            /**
             * Shortcut based on factory creation of Titanium.UI.x
             * @return {Object} the UI Object
             */
            fn = function(opts, tapAct/*, tapArgs*/) {
                // call before callback
                if (factory.before) { factory.before.apply(opts, arguments); }

                var // create it
                    ui = TiFactory(opts),
                    // grab the rest of the arguments
                    args = Array.prototype.slice.call(arguments).splice(1);

                // extend it
                ui = extendUI.apply(ui, args);
                // apply inline tap events
                if (tapAct) { ui.tap.apply(ui, args); }

                // call after callback
                if (factory.after) { factory.after.apply(ui, arguments); }

                // return the UI object
                return ui
            };

        // Provide some basic currying to the user
        return fn;
    },

    // constructor
    UIShortcut = function (Como) {
        "use strict";
        if (!Como) { throw 'Como reference is undefined or null!'; }
        var // Public API
            uiBuilder = {};

        _.each(uiFactories, function (f) { uiBuilder[f.name] = createUI(f, Como); });
        return _.extend({}, uiBuilder);
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