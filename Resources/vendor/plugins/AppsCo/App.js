// set global namespace
var AppsCo = {}; 
// set global App module
AppsCo.App = function() {
    var init, notty;       
    
    /**
     * Function to initialize globals
     */
    init = function() {};
    
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
        props: {
            win: {},        // common props for windows
            buttons: {      // common props for buttons
                test: {
                    backgroundColor: '#bada55'
                }
            },
            tabs: {},       // common props for tabs
            labels: {}      // common props for labels
        },
        // Functions
        init: init,        
        notty: notty
    };
}();