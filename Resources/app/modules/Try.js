AppsCo.Controller.Try = function () {
    return {
        doSave: function (h, e) {
            Ti.API.info('Button Height is : ' + h);
            Ti.API.info(_.keys(e));
            Ti.API.info(e.source.abc);
            AppsCo.App.notty('OS['+ AppsCo.App.osname +'] Version['+ AppsCo.App.version +']');
            AppsCo.App.notty('Width['+ AppsCo.App.width +'] Height['+ AppsCo.App.height +']');
            AppsCo.App.notty((AppsCo.App.isTablet ? 'A' : 'NOT a') + ' Tablet');
        }
    }
}();
