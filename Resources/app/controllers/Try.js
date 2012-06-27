Como.Controller.Try = (function () {
    "use strict";
    var doSave, showLogin, doLogin, doLogout, doSwipe, doManual, doChoose;

    /**
     * Example of an action (event handler), can also accept parameters
     * @param {Object} h a parameter passed by event handler (during listener assignment).
     * @param {Object} e an event parameter from the original component event.
     */
    doSave = function (h, e) {
        var btn = e.source;

        Ti.API.info('Button Height is : ' + h);
        Ti.API.info('btn.abc : ' + btn.abc);

        Como.App.notty('OS['+ Como.Device.osname +'] Version['+ Como.Device.version +']');
        Como.App.notty('Width['+ Como.Device.width +'] Height['+ Como.Device.height +']');
        Como.App.notty((Como.Device.isTablet ? 'A' : 'NOT a') + ' Tablet');
    };

    /**
     * Show login event will create a window and a form to login.
     */
    showLogin = function () {
        var // UI instances / vars
            win = require('/app/views/common/loginWin')(Como);
        //  open it;
        win.open();
    };

    /**
     * User login event handler
     */
    doLogin = function (view, win) {
        var viewElt = view.getChildren(),
            userTxt = viewElt[0], passTxt = viewElt[1];

        Como.App.notty('username is ' + userTxt.value);
        Como.App.notty('password is ' + passTxt.value);

        // TODO validate user with server

        // assume validated
        (function () {
            var userCount = Como.Model.User.count(),
                user = userCount > 0 ? Como.Model.User.findOneBy('id', 1) :
                    Como.Model.User.newRecord({
                        id: 1, name: userTxt.value, pass: passTxt.value
                    });

            if (userCount > 0) {
                user.set('name', userTxt.value);
                user.set('pass', passTxt.value);
            }
            user.save();
        }());

        win.close();
    };

    /**
     * User logout event handler
     */
    doLogout = function (win) {
        Como.Model.User.truncate();
        win.close();
    };

    /**
     * Example of method that manually assign with addEventHandler
     * and apply it with action method
     * @param {String} s a String parameter
     * @param {Number} n a Number parameter
     * @param {Boolean} b a Boolean parameter
     * @param {Object} e an Event object related
     */
    doManual = function(s, n, b, e) {

        Ti.API.info('s = ' + s);
        Ti.API.info('n = ' + n);
        Ti.API.info('b = ' + b);
        Ti.API.info(e.source instanceof Ti.UI.Window);

    };

    /**
     * Example of action when choosing an option in Ti.UI.OptionDialog
     * @param {Object} e an Event object related
     */
    doChoose = function(e) {
        var src = e.source, _ = require('/lib/Underscore/underscore.min');
        Ti.API.info('You selected option['+ e.index +']: '+ e.source.options[e.index]);
    };

    return {
        doSave: doSave,
        showLogin: showLogin,
        doLogin: doLogin,
        doLogout: doLogout,
        doManual: doManual,
        doChoose: doChoose
    };
}());
