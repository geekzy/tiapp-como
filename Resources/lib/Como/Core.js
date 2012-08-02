
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
        var loadDimension,
            // load configurations
            config = require('/app/config/app'),
            // include and load UI properties configuration
            uiProps = require('/app/config/ui'),
            // include joli ORM
            joli = require('/lib/Joli/joli'),
            joliApi = require('/lib/Joli/joli.api');

        // load latest dimension into Como.device
        loadDimension = function() {
            Como.device.height = Ti.Platform.displayCaps.platformHeight;
            Como.device.width = Ti.Platform.displayCaps.platformWidth;
        };

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
        loadDimension();
        // listen to orientation change
        Ti.Gesture.addEventListener('orientationchange', function() { loadDimension(); });

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
        // check for controller cache namespace
        if (!Como._ctrls) { Como._ctrls = []; }
        var Controller, ctrl, exists, pick, iter;

        iter = function (c) { return c.id === name; };
        exists = function () { return _.some(Como._ctrls, iter); };
        pick = function() { return _.find(Como._ctrls, iter); };

        // controller already exists in cache
        if (exists()) {
            ctrl = pick().value;
        // not in cache
        } else {
            // load it
            Controller = require('/app/controllers/' + name);
            ctrl = new Controller(Como);
            // add to cache
            Como._ctrls.push({id: name, value: ctrl});
        }

        return ctrl;
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

            if (!ctrl[method]) {
                throw 'Undefined action in controller';
            }

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

        if (!Como._ui) {
            Como._ui = require('/lib/Como/UIShortcut').init(Como);
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