
// set global AppsCo Mobile namespace
var Como = (function () {
    "use strict";
    var app = {},
        // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // Core methods
        init, applyAction, loadController, loadUI;

    /**
     * Function to initialize globals
     */
    init = function() {
        var // load configurations
            config = require('/app/config/app'),
            // include and load UI properties configuration
            uiProps = require('/app/config/ui'),
            // include joli ORM
            joli = require('/lib/Joli/joli'),
            joliApi = require('/lib/Joli/joli.api');

        // Put configs and UI properties into Como
        Como.ui = uiProps;
        Como.config = config;
        Como.mode = config.mode;

        // Device OS and Version
        Como.device.osname = Ti.Platform.osname;
        Como.device.version = Ti.Platform.version;
        Como.device.iphone = Como.device.osname === 'iphone';
        Como.device.ipad = Como.device.osname === 'ipad';
        Como.device.android = Como.device.osname === 'android';

        // Device dimension
        Como.device.height = Ti.Platform.displayCaps.platformHeight;
        Como.device.width = Ti.Platform.displayCaps.platformWidth;

        // Device is considered a tablet
        Como.device.isTablet = Como.device.ipad ||
            // decide what is considered to be a tablet form factor for android
            (Como.device.android && (Como.device.width > Como.config.tablet.width
                || Como.device.height > Como.config.tablet.height));

        // Device Current Locale
        Como.device.locale = Ti.Platform.locale;

        // Create db Connection and put into Como
        Como.db = joliApi(joli.connect(Como.config.db));

        Como._initted = true;
        return Como;
    };

    /**
     * Function to load a controller
     * @param name the controller name
     * @return the controller instance
     */
    loadController = function (name) {
        if (!name) {
            throw 'Invalid or undefined controller name';
        }

        var Controller = require('/app/controllers/' + name);
        return new Controller(Como);
    };

    /**
     * Apply action path to a function in a Controller by #{Controller}/#{Method} pattern
     * @param {String} action the action path in to apply its function to
     */
    applyAction = function (action/*, args*/) {
        var args = Array.prototype.slice.call(arguments).splice(1);

        return function (e) {
            var act = action.split('/'), ctrl,
                module = act.length > 0 ? act[0] : false,
                method = act.length > 1 ? act[1] : false;

            if (!module || !method) {
                throw 'Undefined action expresion';
            }

            ctrl = loadController(module);

            ctrl[method].apply(e.source, _.union(args, [e]));
        };
    };

    /**
     * Load UI Factory
     */
    loadUI = function () {
        if (!Como._initted) {
            throw 'Como not initialized';
        }

        var UI;
        if (!Como._ui) {
            UI = require('/lib/Como/UIShortcut').init(Como);
            Como._ui = UI;
        }
        return Como._ui;
    };

    // public API
    app.init = init;
    app.loadController = loadController;
    app.applyAction = applyAction;
    app.loadUI = loadUI;

    return _.extend({
        // set device namespace
        device: {},
        // ui (view) component namespace
        ui: {},
        // app status namespace
        status: {}
    }, app);
}());

/**
 * In case Como is loaded as a CommonJS module
 */
if (typeof module === 'object' && module) { module.exports = Como; }