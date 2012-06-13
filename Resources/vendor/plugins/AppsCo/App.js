// set global namespace
var AppsCo = {}; 
// set global App module
AppsCo.App = function() {
    var init, notty, execute, act;       
    
    /**
     * Function to initialize globals
     */
    init = function() {
        
        var cf = Ti.Filesystem.getFile(Ti.Filesystem.resourcesDirectory, 'app/config/app.json').read(),
            config = eval('(' + cf + ')');
            
        this.config = config;
        this.mode = config.mode;
        this.action = config.action;
        
        this.act.call('this', 'AppsCo.App.test', 'x', 'y', 'z');
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
     * Execute a function within a context
     * @param {String} functionName the function name/path
     * @param {Object} context the context of the function to execute
     * @scope public
     */
    execute = function(functionName, context /*, args */) {
        context = context || window;
        var i, args = Array.prototype.slice.call(arguments).splice(2),
            namespaces = functionName.split("."),
            func = namespaces.pop();
        
        for(i = 0; i < namespaces.length; i++) {
            context = context[namespaces[i]];
        }

        return context[func].apply(this, args);
    };
    
    /**
     * Function to trigger action 
     * @param {String} name the action name in configuration
     * @scope public
     */
    act = function(name/*, args*/) {
        var args = [name, global],
            params = Array.prototype.slice.call(arguments).splice(1);
        
        args = _.union(args, params);
        return AppsCo.App.execute.apply(this, args);
    };
        
    return {
        // Device OS and Version
        osname: Ti.Platform.osname,
        version: Ti.Platform.version,
        // Device dimension
        height: Ti.Platform.displayCaps.platformHeight,
        width: Ti.Platform.displayCaps.platformWidth,
        // Device is considered a tablet
        isTablet: this.osname === 'ipad' ||
            // decide what is considered to be a tablet form factor for android 
            (this.osname === 'android' && (this.width > 899 || this.height > 899)),
        // ui component common properties
        ui: {
            win: {},        // common props for windows
            buttons: {      // common props for buttons
                                
                test: {     // test button global props
                    backgroundColor: '#bada55'
                }
                
            },
            tabs: {},       // common props for tabs
            labels: {}      // common props for labels
        },
        
        // Public Functions
        init: init,        
        notty: notty,
        execute: execute,
        act: act,
        test: function(a, b, c) {
            Ti.API.info(this);            
            Ti.API.info(a);
            Ti.API.info(b);
            Ti.API.info(c);       
        }
    };
}();