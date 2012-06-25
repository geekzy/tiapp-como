function mainWin (C) {
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // include UI Helper module
        UI = require('/lib/Como/UIShortcut'),

        // create a selfdow
        self = UI.win(C.App.extend(
            // base (common) attributes
            C.UI.win.common,
            // cuctom attributes
            { titleid: 'winMain', exitOnClose: true }
        )),
        // create a button
        btnTest = UI.button(C.App.extend(
            C.UI.buttons.badass,
            { titleid: 'btnTest', abc: 'xyz' }
        )),
        btnLogin = UI.button(C.App.extend(
            C.UI.buttons.badass,
            { titleid: 'btnLogin', top: '80dp' }
        ));

    // listen to tap event
    btnTest.tap('Try/doSave', btnTest.getHeight());
    btnLogin.click('Try/showLogin');
    self.tap(function (e) {
        // prevent event bubblic from children's tap event
        if (e.source === self) {
            Ti.API.info('Window Tapped!');
            // fire custom event
            self.fireEvent('winTap', {p1: 'xxx'});
        }
    });
    // listen to custom event
    self.addEventListener('winTap', C.App.applyAction('Try/doManual', 'x', 1, true));

    // add button into selfdow
    self.add(btnTest);
    self.add(btnLogin);

    return self;
}

module.exports = mainWin;
