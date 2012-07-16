module.exports = function (Como) {
    "use strict";
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // include Como Utility
        $ = require('/lib/Como/Utils'),
        // include Login Window
        LoginWindow = require('/app/views/LoginWindow'),
        // Controller methods/actions
        showLogin, doLogin, doLogout, doAjax;

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
            url: Como.config.remote + 'como/login.php',
            data: {nick: userTxt.value, pass: passTxt.value, plain: 1},
            success: function(usr) {
                // auth success
                if (!usr.fail) {
                    Como.db.models.get('user').newRecord({
                        id: 1, nick: usr.nick, roleid: usr.role, fname: usr.fname, lname: usr.lname
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

    /**
     * Example of action demonstrating HttpClient request
     */
    doAjax = function () {
        $.ajax({
            url: Como.config.remote + 'como/login.php',
            data: {nick: 'admin', pass: 'como01', plain: 1},
            success: function(resp) {
                // default dataType is json so resp is already js object
                Ti.API.info(resp);
                // use this ref for raw response data
                Ti.API.info(this.responseText);

                alert(resp.lname);
            }
        });
    };

    // Public API
    return {
        showLogin: showLogin,
          doLogin: doLogin,
         doLogout: doLogout,
           doAjax: doAjax
    }
}