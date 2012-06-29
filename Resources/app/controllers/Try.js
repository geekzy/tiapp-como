Como.Controller.Try = (function () {
    "use strict";
    var doSave, showLogin, doLogin, doLogout, doSwipe, doManual, doChoose, doAjax;

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
    showLogin = function (e) {
        var // UI instances / vars
            btn = e.source,
            win = require('/app/views/common/loginWin')(Como, btn);
        //  open it;
        win.open();
    };

    /**
     * User login event handler
     */
    doLogin = function (view, win, btn) {
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

            btn.setTitle(L('btnUser'));
            user.save();
        }());

        win.close();
    };

    /**
     * User logout event handler
     */
    doLogout = function (win, btn) {
        Como.Model.User.truncate();
        btn.setTitle(L('btnLogin'));
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
        Ti.API.info('p1 = ' + e.p1);
        Ti.API.info(e.source instanceof Ti.UI.Window);

    };

    /**
     * Example of action when choosing an option in Ti.UI.OptionDialog
     * @param {Object} e an Event object related
     */
    doChoose = function (e) {
        var src = e.source, _ = require('/lib/Underscore/underscore.min');
        Ti.API.info(_.keys(e));
        Ti.API.info('You selected option['+ e.index +']: '+ e.source.options[e.index]);
    };

    /**
     * Example of action demonstrating HttpClient request
     */
    doAjax = function () {
        var $ = require('/lib/Como/Utils');
        $.ajax({
            url: 'http://110.74.169.145/educonnect/login.php',
            data: {login: 'student', pass: 'student', plain: 1},
            success: function(resp) {
                // default dataType is json so resp is already js object
                Ti.API.info(resp);
                // use this ref for raw response data
                Ti.API.info(this.responseText);
            }
        });
    };

    return {
           doSave: doSave,
        showLogin: showLogin,
          doLogin: doLogin,
         doLogout: doLogout,
         doManual: doManual,
         doChoose: doChoose,
           doAjax: doAjax
    };
}());
