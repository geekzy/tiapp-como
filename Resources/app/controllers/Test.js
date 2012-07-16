module.exports = function (Como) {
    "use strict";
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // include Como Utility
        $ = require('/lib/Como/Utils'),
        // include Login Window
        LoginWindow = require('/app/views/LoginWindow'),
        // Controller methods/actions
        showLogin, doLogin, doLogout;

    /**
     * Show login event will create a window and a form to login.
     */
    showLogin = function () {
        // create Login window instance
        var win = new LoginWindow(Como, this);
        //  open it;
        win.open();
    };

    /**
     * User login event handler
     */
    doLogin = function (view, win, btn) {
        var viewElt = view.getChildren(),
            userTxt = viewElt[0], passTxt = viewElt[1];

        Ti.UI.Android.hideSoftKeyboard();
        $.ajax({
            url: 'http://110.74.169.145/educonnect/login.php',
            data: {login: userTxt.value, pass: passTxt.value, plain: 1},
            success: function(usr) {
                // auth success
                if (!usr.fail) {
                    Como.db.models.get('user').newRecord({
                        id: 1, name: userTxt.value, pass: passTxt.value
                    }).save();
                    btn.setTitle(L('btnUser'));
                    win.close();
                }
                // auth failed
                else {
                    passTxt.value = '';
                    $.notty('Incorrect Username or Password');
                }
            }
        });
    };

    /**
     * User logout event handler
     */
    doLogout = function (win, btn) {
        Como.db.models.get('user').truncate();
        btn.setTitle(L('btnLogin'));
        win.close();
    };

    return {
        showLogin: showLogin,
          doLogin: doLogin,
         doLogout: doLogout
    }
}