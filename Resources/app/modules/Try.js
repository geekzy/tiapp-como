AppsCo.Module.Try = function () {
    var Win = require('/app/ui/common/AppWin'), 
        UI = require('/app/ui/common/UIShortcut'), 
        doSave, showLogin, doLogin;
    
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
    showLogin = function() {
        AppsCo.App.notty('Showing Login Screen');
        var scrolly = UI.scrolly({contentHeight:'auto'}),
            win = UI.win({title: 'User Login', backgroundColor: '#bada55', navBarHidden: false}),

            userInText = UI.textfield({
                id: 'userTxt',
                borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
                keyboardType: Titanium.UI.KEYBOARD_ASCII,
                color: '#336699', height: '40dp', width: '250dp', hintText: 'username', top: '20dp'
            }), 

            passInText = UI.textfield({
                id:  'passTxt',
                borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
                keyboardType: Titanium.UI.KEYBOARD_ASCII,
                color: '#336699', height: '40dp', width: '250dp', hintText: 'password', top: '70dp',
                passwordMask: true
            }),
            
            loginBtn = UI.button({
                    titleid: 'btnLogin',
                    color: '#ffffff', backgroundColor: '#223344', height: '35dp', width: '150dp', top: '120dp'
                }, 
            // Listen to tap events
            'Try/doLogin', scrolly, win);

        // add form elements into view
        scrolly.add(userInText);
        scrolly.add(passInText);
        scrolly.add(loginBtn);
        // add view into window
        win.add(scrolly);

        // Listen to login button tap
        //loginBtn.tap("Try/doLogin", scrolly.getChildren(), win);
        
        win.open();
    };

    /**
     * User login event handler
     */
    doLogin = function(view, win) {
        var viewElt = view.getChildren(), 
            userTxt = viewElt[0], passTxt = viewElt[1];
        
        AppsCo.App.notty("username is " + userTxt.value);
        AppsCo.App.notty("password is " + passTxt.value);
        
        win.close();
        
    };
    return {
        doSave: doSave,
        showLogin: showLogin,
        doLogin: doLogin
    };
}();
