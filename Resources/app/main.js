// single context application, 
// please include your UI components & assign listeners here
(function() {
    // include components
    var UI = require('/app/ui/common/UIShortcut');

    if (AppsCo.App.isTablet) {
        Win = require('/app/ui/tablet/AppWin');
    }

    // UI instances / vars
    var // create a window
        win = UI.win(AppsCo.App.extend(
            // base (common) attributes
            AppsCo.App.UI.win.common, 
            // cuctom attributes
            { title: 'Main Window', exitOnClose: true }
        )),        
        // create a button
        btnTest = UI.button(AppsCo.App.extend(            
            AppsCo.App.UI.buttons.badass,
            { titleid: 'btnTest', abc: 'xyz' }
        )),
        btnLogin = UI.button(AppsCo.App.extend(
            AppsCo.App.UI.buttons.badass,
            { titleid: 'btnLogin', top: '80dp' }
        ));
    
    // listen to tap event
    btnTest.tap('Try/doSave', btnTest.getHeight());
    btnLogin.click('Try/showLogin');

    // add button into window
    win.add(btnTest);
    win.add(btnLogin);
    // open the window
    win.open();
}());