AppsCo.Controller.Try = function () {
    var doSave;
    
    /**
     * Example of an action (event handler), can also accept parameters
     *  
     * @param {Object} h a parameter passed by event handler (during listener assignment).
     * @param {Object} e an event parameter from the original component event.
     */
    doSave = function (h, e) {
        var btn = e.source;
        
        Ti.API.info('Button Height is : ' + h);            
        Ti.API.info('btn.abc : ' + btn.abc);
        
        AppsCo.App.notty('OS['+ AppsCo.Device.osname +'] Version['+ AppsCo.Device.version +']');
        AppsCo.App.notty('Width['+ AppsCo.Device.width +'] Height['+ AppsCo.Device.height +']');
        AppsCo.App.notty((AppsCo.Device.isTablet ? 'A' : 'NOT a') + ' Tablet');
    };
    
    return {
        doSave: doSave
    };
}();
