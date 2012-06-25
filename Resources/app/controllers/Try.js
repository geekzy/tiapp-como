Como.Controller.Try = (function () {
    "use strict";
    var _ = require('/lib/Underscore/underscore.min'),
        UI = require('/app/views/common/UIShortcut'),
        doSave, showLogin, doLogin, doSwipe, doManual;

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
        Como.App.notty('Showing Login Screen');

        (function () {
            var users = Como.Model.User.all();
            Como.App.notty(Como.Model.User.info());
            _.each(users, function(u) {
                Como.App.notty('Found user' + u.display(), Ti.UI.NOTIFICATION_DURATION_LONG);
            });
        }());

        var scrolly = UI.scrolly({contentHeight:'auto'}),
            win = UI.win(Como.App.extend(
                Como.UI.win.common,
                {titleid: 'winLogin', backgroundColor: '#bada55'}
            )),

            userInText = UI.textfield(Como.App.extend(
                Como.UI.inputs.textfield,
                { id: 'userTxt', hintText: 'username', top: '20dp' }
            )),

            passInText = UI.textfield(Como.App.extend(
                Como.UI.inputs.textfield,
                { id:  'passTxt', hintText: 'password', top: '70dp', passwordMask: true }
            )),

            loginBtn = UI.button(
                Como.UI.buttons.login,
                // Listen to tap events
                'Try/doLogin', scrolly, win
            );

        // add form elements into view
        scrolly.add(userInText);
        scrolly.add(passInText);
        scrolly.add(loginBtn);
        // add view into window
        win.add(scrolly);

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
    return {
        doSave: doSave,
        showLogin: showLogin,
        doLogin: doLogin,
        doManual: doManual
    };
}());
