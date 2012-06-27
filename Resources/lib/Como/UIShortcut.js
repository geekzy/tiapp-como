function UIShortcut(Como) {
    "use strict";
    if (!Como) { throw 'Como reference is undefined or null!'; }
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        /**
         * Function Titanium.UI factory wrapper
         * @param {Function} factory the factory function to create the UI
         * @return {Object} the Titanium.UI instance produce by factory function
         */
        createUI = function(factory) {
            var /**
                 * Generate a reusable function that will serve as a template of event handler
                 * @param {Mixed} evtName the event name or a handler (function) itself
                 * @return {Function} the Function generated for attached to the event hanler
                 */
                handlerFn = function (evtName) {
                    return function () {
                        var applyFn, args = arguments, inline = (typeof args[0]) === 'function';

                        if (_.size(args) === 0) { applyFn = function () {}; }
                        else {
                            // the event handler for the specified event name
                            applyFn = function (e) {
                                [].push.apply(args, [e]);
                                Como.App.act.apply(this, args);
                            };
                        }
                        // add listener of event name with the specified handler
                        this.addEventListener(evtName, inline ? args[0] : applyFn);
                    };
                },

                /**
                 * Shortcut based on factory creation of Titanium.UI.x
                 */
                fn = function(opts, tapAct/*, tapArgs*/) {
                    var ui = factory(opts),
                        args = Array.prototype.slice.call(arguments).splice(1);

                    ui.tap = handlerFn('touchend');
                    ui.click = handlerFn('click');
                    ui.taphold = handlerFn('longpress');
                    ui.swipe = handlerFn('swipe');
                    // more event handler shortcut here

                    if (tapAct) { ui.tap.apply(ui, args); }

                    return ui;
                };

            // Provide some basic currying to the user
            return fn;
        };

    // Public API
    return {
        /**
         * Shortcut for Titanium.UI.View creation using Ti.UI.createView as factory
         * @param {Object} opts the options for the UI
         * @param {String} tapAct the action name apply to the UI tap event
         * @return {Object} the Titanium.UI.View instance
         */
        view: createUI(Ti.UI.createView),

        /**
         * Shortcut for Titanium.UI.ScrollView creation using Ti.UI.createScrollView as factory
         * @param {Object} opts the options for the UI
         * @param {String} tapAct the action name apply to the UI tap event
         * @return {Object} the Titanium.UI.ScrollView instance
         */
        scrolly: createUI(Ti.UI.createScrollView),

        /**
         * Shortcut for Titanium.UI.Label creation using Ti.UI.createLabel as factory
         * @param {Object} opts the options for the UI
         * @param {String} tapAct the action name apply to the UI tap event
         * @return {Object} the Titanium.UI.Label instance
         */
        label: createUI(Ti.UI.createLabel),

        /**
         * Shortcut for Titanium.UI.TextField creation using Ti.UI.createTextField as factory
         * @param {Object} opts the options for the UI
         * @param {String} tapAct the action name apply to the UI tap event
         * @return {Object} the Titanium.UI.TextField instance
         */
        textfield: createUI(Ti.UI.createTextField),

        /**
         * Shortcut for Titanium.UI.TextArea creation using Ti.UI.createTextArea as factory
         * @param {Object} opts the options for the UI
         * @param {String} tapAct the action name apply to the UI tap event
         * @return {Object} the Titanium.UI.TextArea instance
         */
        textarea: createUI(Ti.UI.createTextArea),

        /**
         * Shortcut for Titanium.UI.ImageView creation using Ti.UI.createImageView as factory
         * @param {Object} opts the options for the UI
         * @param {String} tapAct the action name apply to the UI tap event
         * @return {Object} the Titanium.UI.ImageView instance
         */
        image: createUI(Ti.UI.createImageView),

        /**
         * Shortcut for Titanium.UI.Window creation using Ti.UI.createWindow as factory
         * @param {Object} opts the options for the UI
         * @param {String} tapAct the action name apply to the UI tap event
         * @return {Object} the Titanium.UI.Window instance
         */
        win: createUI(Ti.UI.createWindow),

        /**
         * Shortcut for Titanium.UI.Button creation using Ti.UI.createButton as factory
         * @param {Object} opts the options for the UI
         * @param {String} tapAct the action name apply to the UI tap event
         * @return {Object} the Titanium.UI.Button instance
         */
        button: createUI(Ti.UI.createButton),

        /**
         * Shortcut for Titanium.UI.Picker creation using Ti.UI.createPicker as factory
         * @param {Object} opts the options for the UI
         * @param {String} tapAct the action name apply to the UI tap event
         * @return {Object} the Titanium.UI.Picker instance
         */
        picker: createUI(Ti.UI.createPicker),

        /**
         * Shortcut for Titanium.UI.ActivityIndicator creation using Ti.UI.createActivityIndicator as factory
         * @param {Object} opts the options for the UI
         * @param {String} tapAct the action name apply to the UI tap event
         * @return {Object} the Titanium.UI.ActivityIndicator instance
         */
        indicator: createUI(Ti.UI.createActivityIndicator),

        /**
         * Shortcut for Titanium.UI.OptionDialog creation using Ti.UI.createOptionDialog as factory
         * @param {Object} opts the options for the UI
         * @param {String} tapAct the action name apply to the UI tap event
         * @return {Object} the Titanium.UI.OptionDialog instance
         */
        optdialog: createUI(Ti.UI.createOptionDialog)
    };
};

module.exports = UIShortcut;