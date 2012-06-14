// set global AppsCo Mobile namespace
var AppsCo = {
    // set device namespace
    Device: {},
    // set controller namespace
    Controller: {},
    // set model namespace
    Model: {}
};
// set global App module
AppsCo.App = function() {
    var init, execute, notty, act, extend;

    /**
     * Function to initialize globals
     * @scope public
     */
    init = function() {
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
        
        // Device is considered a tablet
        AppsCo.Device.isTablet = AppsCo.Device.ipad ||
            // decide what is considered to be a tablet form factor for android
            (AppsCo.Device.android && (this.width > 899 || this.height > 899));
            
        // Device dimension
        AppsCo.Device.height = Ti.Platform.displayCaps.platformHeight;
        AppsCo.Device.width = Ti.Platform.displayCaps.platformWidth;
        // Device Current State
        AppsCo.Device.locale = Ti.Platform.locale;
        
    };
    
    /**
     * Execute a function within a context
     * @param {String} functionName the function name/path
     * @param {Object} context the context of the function to execute
     * @scope private
     */
    execute = function(fnName, context /*, args */) {
        context = context || window;
        var i, args = Array.prototype.slice.call(arguments).splice(2),
            namespaces = fnName.split("."),
            func = namespaces.pop();

        for(i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }

        return context[func].apply(this, args);
    };

    /**
     * Function to show notification
     * @param {String} msg the message to notify
     * @scope public
     */
    notty = function(msg, duration) {
        Ti.UI.createNotification({
            message: msg || '',
            duration: duration || Ti.UI.NOTIFICATION_DURATION_SHORT
        }).show();
    };

    /**
     * Function to trigger action
     * @param {String} name the action name in configuration
     * @scope public
     */
    act = function(fexp/*, args*/) {
        var exp = fexp.split('/'),
            func = _.find(AppsCo.action, function(a) {
                    return a.module === exp[0] && a.name === exp[1];
            }),
            args = [func ? func.path : '', global],
            params = Array.prototype.slice.call(arguments).splice(1);

        if (!func) { throw 'Undefined action expresion'; }
        args = _.union(args, params);
        return execute.apply(this, args);
    };

    /**
     * Proxying underscore's object extend function
     * to preserve defaults
     */
    extend = function(defaults, opts/*, more objects to extend*/) {
        var args = [{}, defaults, opts],
            objs = Array.prototype.slice.call(arguments).splice(2);
        return _.extend.apply(this, _.union(args, objs));
    };

    return {
        // ui component default properties
        UI: {
            win: {},        // default props for windows
            buttons: {},    // default props for buttons
            tabs: {},       // default props for tabs
            labels: {}      // default props for labels
            // etc
        },

        // Public Common (App) Scope Functions
        init: init,
        notty: notty,
        act: act,
        extend: extend
    };
}();
