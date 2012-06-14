// single context application, 
// please include your UI components & assign listeners here
(function() {
    // include components
    var Win = require('/app/ui/common/AppWin');

    if (AppsCo.App.isTablet) {
        Win = require('/app/ui/tablet/AppWin');
    }

    // UI instances / vars
    var // create a window
        win = new Win('Window One'),
        // create a button
        btnTest = Ti.UI.createButton(AppsCo.App.extend(
            // base (common) attributes
            AppsCo.App.UI.buttons.test,
            // cuctom attributes
            { titleid: 'btnTest', abc: 'xyz' }
        )),
        btnLogin = Ti.UI.createButton(AppsCo.App.extend(
            AppsCo.App.UI.buttons.test,
            { titleid: 'btnLogin', top: '80dp' }
        ));

    // listen to tap event
    btnTest.tap('Try/doSave', btnTest.getHeight());
    btnLogin.tap('Try/showLogin');

    // add button into window
    win.add(btnTest);
    win.add(btnLogin);
    // open the window
    win.open();
}());