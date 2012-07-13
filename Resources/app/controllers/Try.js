module.exports = function (Como) {
    "use strict";
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // include Como Utility
        $ = require('/lib/Como/Utils'),
        // include Login Window
        LoginWindow = require('/app/views/LoginWindow'),
        // Controller methods/actions
        doSave, showLogin, doLogin, doLogout, doSwipe, doManual, doChoose, doAjax, doSwipe,
        doDownload, doCheckOnline;

    /**
     * Example of an action (event handler), can also accept parameters
     * @param {Object} h a parameter passed by event handler (during listener assignment).
     * @param {Object} e an event parameter from the original component event.
     */
    doSave = function (h) {
        Ti.API.info('Button Height is : ' + h);
        Ti.API.info('btn.abc : ' + this.abc);

        $.notty('OS['+ Como.device.osname +'] Version['+ Como.device.version +']');
        $.notty('Width['+ Como.device.width +'] Height['+ Como.device.height +']');
        $.notty((Como.device.isTablet ? 'A' : 'NOT a') + ' Tablet');
    };

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
        Ti.API.info('You selected option['+ e.index +']: '+ this.options[e.index]);
    };

    /**
     * Example of action demonstrating HttpClient request
     */
    doAjax = function () {
        $.ajax({
            url: 'http://110.74.169.145/educonnect/login.php',
            data: {login: 'student', pass: 'student', plain: 1},
            success: function(resp) {
                // default dataType is json so resp is already js object
                Ti.API.info(resp);
                // use this ref for raw response data
                Ti.API.info(this.responseText);

                alert(resp.fname);
            }
        });
    };

    /**
     * Example of action demonstrating HttpClient request for Downloading
     */
    doDownload = function (pbar) {
        $.ajax({
            //url: 'http://geekzy.net/share/Rhogen.with.Sencha_for_Rhodes.3.3.1.zip',
            url: 'http://geekzy.net/share/movie-list.txt',
            dataType: 'plain',
            progress: pbar,
            success: function () {
                var filename = $.filenameOfURL(this.location),
                    file = Titanium.Filesystem.getFile(Como.config.sdcard, filename);

                file.write(this.responseData);
                pbar.value = 0;
            }
        });
    };

    /**
     * Example of action when swiping a component
     */
    doSwipe = function (e) {
        alert('You swiped ' + e.direction + '!');
    };

    /**
     * Example of action to check device's connectivity
     */
    doCheckOnline = function() {
        var online = $.deviceOnline();
        alert('Device is ' + (online ? 'ONLINE' : 'OFFLINE') + '.');
    }

    return {
               doSave: doSave,
            showLogin: showLogin,
              doLogin: doLogin,
             doLogout: doLogout,
             doManual: doManual,
             doChoose: doChoose,
               doAjax: doAjax,
              doSwipe: doSwipe,
           doDownload: doDownload,
        doCheckOnline: doCheckOnline
    };
};
