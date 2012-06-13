AppsCo.Controller.Try = function () {
    return {
        doSave: function () {
            Ti.API.info(_.keys(this));
            AppsCo.App.notty('OS['+ AppsCo.App.osname +'] Version['+ AppsCo.App.version +']');
            AppsCo.App.notty('Width['+ AppsCo.App.width +'] Height['+ AppsCo.App.height +']');
            AppsCo.App.notty((AppsCo.App.isTablet ? 'A' : 'NOT a') + ' Tablet');
        }
    }
}();
