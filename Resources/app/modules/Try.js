AppsCo.Module.Try = (function () {
    "use strict";
    var UI = require('/app/ui/common/UIShortcut'), 
        doSave, showLogin, doLogin, doSwipe, doManual;
    
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
    
    /**
     * Show login event will create a window and a form to login.
     */
    showLogin = function () {
        AppsCo.App.notty('Showing Login Screen');
        var scrolly = UI.scrolly({contentHeight:'auto'}),
            win = UI.win(AppsCo.App.extend(
                AppsCo.UI.win.common,
                {titleid: 'winLogin', backgroundColor: '#bada55'}
            )),

            userInText = UI.textfield(AppsCo.App.extend(
                AppsCo.UI.inputs.textfield,
                { id: 'userTxt', hintText: 'username', top: '20dp' }
            )), 

            passInText = UI.textfield(AppsCo.App.extend(
                AppsCo.UI.inputs.textfield,
                { id:  'passTxt', hintText: 'password', top: '70dp', passwordMask: true }
            )),
            
            loginBtn = UI.button(
                AppsCo.UI.buttons.login,
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

        AppsCo.App.notty("username is " + userTxt.value);
        AppsCo.App.notty("password is " + passTxt.value);

        win.close();
    };


    /**
     * Example of method that manually assign with addEventHandler
     *
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
