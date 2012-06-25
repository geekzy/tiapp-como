// single context application,
// please include your UI components & assign listeners here
(function () {
    // include components
    var UI = require('/app/views/common/UIShortcut');

    // UI instances / vars
    var // create a window
        win = UI.win(AppsCo.App.extend(
            // base (common) attributes
            AppsCo.UI.win.common,
            // cuctom attributes
            { titleid: 'winMain', exitOnClose: true }
        )),
        // create a button
        btnTest = UI.button(AppsCo.App.extend(
            AppsCo.UI.buttons.badass,
            { titleid: 'btnTest', abc: 'xyz' }
        )),
        btnLogin = UI.button(AppsCo.App.extend(
            AppsCo.UI.buttons.badass,
            { titleid: 'btnLogin', top: '80dp' }
        ));

    // listen to tap event
    btnTest.tap('Try/doSave', btnTest.getHeight());
    btnLogin.click('Try/showLogin');
    win.tap(function (e) {
        // prevent event bubblic from children's tap event
        if (e.source === win) {
            Ti.API.info('Window Tapped!');
            // fire custom event
            win.fireEvent('winTap', {p1: 'xxx'});
        }
    });
    // listen to custom event
    win.addEventListener('winTap', AppsCo.App.applyAction('Try/doManual', 'x', 1, true));

    // add button into window
    win.add(btnTest);
    win.add(btnLogin);
    // open the window
    win.open();
}());
