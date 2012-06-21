// set global AppsCo Mobile namespace
var AppsCo = {
    // set device namespace
    Device: {},
    // set controller namespace
    Module: {},
    // set model namespace
    Model: {},
    // ui component namespace
    UI: {}
};
// set global App module
AppsCo.App = (function () {
    "use strict";
    var init, execute, notty, act, extend, applyAction;

    /**
     * Function to initialize globals
     */
    init = function () {
        // get configurations
        var cf = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'app/config/app.json').read(),
            config = eval('(' + cf + ')');

        AppsCo.config = config;
        AppsCo.mode = config.mode;
        AppsCo.action = config.action;

        // Device OS and Version
        AppsCo.Device.osname = Ti.Platform.osname;
        AppsCo.Device.version = Ti.Platform.version;
        AppsCo.Device.iphone = AppsCo.Device.osname === 'iphone';
        AppsCo.Device.ipad = AppsCo.Device.osname === 'ipad';
        AppsCo.Device.android = AppsCo.Device.osname === 'android';

        // Device dimension
        AppsCo.Device.height = Ti.Platform.displayCaps.platformHeight;
        AppsCo.Device.width = Ti.Platform.displayCaps.platformWidth;

        // Device is considered a tablet
        AppsCo.Device.isTablet = AppsCo.Device.ipad ||
            // decide what is considered to be a tablet form factor for android
            (AppsCo.Device.android && (AppsCo.Device.width > 899 || AppsCo.Device.height > 899));

        // Device Current State
        AppsCo.Device.locale = Ti.Platform.locale;

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
     * Function to show notification
     * @param {String} msg the message to notify
     */
    notty = function (msg, duration) {
        Ti.UI.createNotification({
            message: msg || '',
            duration: duration || Ti.UI.NOTIFICATION_DURATION_SHORT
        }).show();
    };

    /**
     * Function to trigger action
     * @param {String} fexp the action path in configuration
     */
    act = function (fexp/*, args*/) {
        var exp = fexp.split('/'),
            func = _.find(AppsCo.action, function (a) {
                    return a.module === exp[0] && a.name === exp[1];
            }),
            args = [func ? func.path : '', global],
            params = Array.prototype.slice.call(arguments).splice(1);

        // can't find action path, it's not defined in config
        if (!func) {
            // Try to figure out from the given action path
            func = AppsCo.Module[exp[0]];
            func = func ? func[exp[1]] : false;

            // still can't find it, give up!
            if ((typeof func) === 'undefined') {
                throw 'Undefined action expresion';
            }
            // ok got it, rebuild the base args array
            else {
                func = 'AppsCo.Module.' + exp[0] + '.' + exp[1];
                args = [func, global];
            }
        }

        // merge arguments with handler params
        args = _.union(args, params);
        return execute.apply(this, args);
    };

    /**
     * Proxying underscore's object extend function
     * to preserve defaults
     * @param {Object} defaults the base object to apply to
     * @param {Object} opts the custom attributes to apply to base (defaults)
     */
    extend = function (defaults, opts/*, more objects to extend*/) {
        var args = [{}, defaults, opts],
            objs = Array.prototype.slice.call(arguments).splice(2);
        return _.extend.apply(this, _.union(args, objs));
    };

    /**
     * Apply action path to a function configured at app.json config
     * @param {String} action the action path in to apply its function to
     */
    applyAction = function (action/*, args*/) {
        var args = arguments;
        return function (e) {
            [].push.apply(args, [e]);
            act.apply(this, args);
        };
    }

    // Public Common (App) Scope Functions
    return {
        init: init,
        notty: notty,
        act: act,
        extend: extend,
        applyAction: applyAction
    };
}());
