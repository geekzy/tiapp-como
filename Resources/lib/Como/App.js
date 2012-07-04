// set global AppsCo Mobile namespace
var Como = {
    // set device namespace
    Device: {},
    // set controller namespace
    Controller: {},
    // set model namespace
    Model: {},
    // ui (view) component namespace
    UI: {},
    // app status namespace
    Status: {}
};
// set global App module
Como.App = (function () {
    "use strict";
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // Como.App utility methods
        init, execute, act, applyAction;

    /**
     * Function to initialize globals
     */
    init = function () {

        var // load configurations
            config = require('/app/config/app'),
            // include and load UI properties configuration
            uiProps = require('/app/config/ui'),
            // include joli ORM
            joli = require('/lib/Joli/joli'),
            joliApi = require('/lib/Joli/joli.api');

        // Put configs and UI properties into Como
        Como.UI = uiProps;
        Como.config = config;
        Como.mode = config.mode;
        Como.action = config.action;

        // Device OS and Version
        Como.Device.osname = Ti.Platform.osname;
        Como.Device.version = Ti.Platform.version;
        Como.Device.iphone = Como.Device.osname === 'iphone';
        Como.Device.ipad = Como.Device.osname === 'ipad';
        Como.Device.android = Como.Device.osname === 'android';

        // Device dimension
        Como.Device.height = Ti.Platform.displayCaps.platformHeight;
        Como.Device.width = Ti.Platform.displayCaps.platformWidth;

        // Device is considered a tablet
        Como.Device.isTablet = Como.Device.ipad ||
            // decide what is considered to be a tablet form factor for android
            (Como.Device.android && (Como.Device.width > Como.config.tablet.width
                || Como.Device.height > Como.config.tablet.height));

        // Device Current Locale
        Como.Device.locale = Ti.Platform.locale;

        // Create db Connection and put into Como
        Como.joli = joliApi(joli).connect(Como.config.db);
    };

    /**
     * Execute a function within a context
     * @param {String} functionName the function name/path
     * @param {Object} context the context of the function to execute
     */
    execute = function (fnName, context /*, args */) {
        var i, args = Array.prototype.slice.call(arguments).splice(2),
            namespaces = fnName.split("."),
            func = namespaces.pop(),
            ctx = context || window;

        for(i = 0; i < namespaces.length; i += 1) {
            ctx = ctx[namespaces[i]];
        }

        return ctx[func].apply(this, args);
    };

    /**
     * Function to trigger action
     * @param {String} fexp the action path in configuration
     */
    act = function (fexp/*, args*/) {
        var exp = fexp.split('/'),
            func = _.find(Como.action, function (a) {
                    return a.module === exp[0] && a.name === exp[1];
            }),
            args = [func ? func.path : '', global],
            params = Array.prototype.slice.call(arguments).splice(1);

        // can't find action path, it's not defined in config
        if (!func) {
            // Try to figure out from the given action path
            func = Como.Controller[exp[0]];
            func = func ? func[exp[1]] : false;

            // still can't find it, give up!
            if ((typeof func) === 'undefined') {
                throw 'Undefined action expresion';
            }
            // ok got it, rebuild the base args array
            else {
                func = 'Como.Controller.' + exp[0] + '.' + exp[1];
                args = [func, global];
            }
        }

        // merge arguments with handler params
        //args = _.union(args, params);
        [].push.apply(args, params);
        return execute.apply(this, args);
    };

    /**
     * Apply action path to a function configured at /app/config/app.js config
     * @param {String} action the action path in to apply its function to
     */
    applyAction = function (action/*, args*/) {
        var args = Array.prototype.slice.call(arguments).splice(1);
        return function (e) {
            act.apply(this, _.union([action], args, [e]));
        };
    }

    // Public Common (App) Scope Functions
    return {
               init: init,
                act: act,
        applyAction: applyAction
    };
}());
