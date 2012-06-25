(function () {

    var _ = require('/lib/Underscore/underscore.min'),
        // common apply function for events
        handlerFn,
        // UI Objects Collection to be extended
        uiObjects = [
            Ti.UI.View,
            Ti.UI.ScrollView,
            Ti.UI.Label,
            Ti.UI.TextField,
            Ti.UI.TextArea,
            Ti.UI.ImageView,
            Ti.UI.Window,
            Ti.UI.Button,
            Ti.UI.Picker,
            Ti.UI.ActivityIndicator
        ];

    handlerFn = function (evtName) {
        return function () {
            var applyFn, args = arguments, inline = (typeof args[0]) === 'function';

            if (_.size(args) === 0) { applyFn = function () {}; }
            else {
                applyFn = function (e) {
                    [].push.apply(args, [e]);
                    Como.App.act.apply(this, args);
                };
            }

            this.addEventListener(evtName, inline ? args[0] : applyFn);
        };
    };

    _.each(uiObjects, function (obj) {
        _.extend(obj.prototype, {
            click: handlerFn('click'),
            tap: handlerFn('touchstart'),
            taphold: handlerFn('longpress'),
            swipe: handlerFn('swipe')
        });
    });

}());