function mainWin (C) {
    "use strict";
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // include UI Helper module
        UI = require('/lib/Como/UIShortcut')(C),

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
        )),
        btnChoose = UI.button(C.App.extend(
            C.UI.buttons.badass,
            { titleid: 'btnChoose', top: '140dp' }
        )),
        btnAjax = UI.button(C.App.extend(
            C.UI.buttons.badass,
            { titleid: 'btnAjax', top: '200dp' }
        )),
        // create option dialog
        optDlg = UI.optdialog({
          cancel: 1,
          titleid: 'optDlgTitle',
          options: [L('optConfirm'), L('optCancel'), L('optHelp')],
          selectedIndex: 1,
          destructive: 0
        });

    // listen to tap event
    btnTest.tap('Try/doSave', btnTest.getHeight());
    btnChoose.tap(function() {
        optDlg.click('Try/doChoose');
        optDlg.show();
    });
    btnAjax.tap('Try/doAjax');
    self.tap(function (e) {
        // prevent event bubbling from children's tap event
        if (e.source === self) {
            Ti.API.info('Window Tapped!');
            // fire custom event
            self.fireEvent('winTap', {p1: 'xxx'});
        }
    });

    // listen to click event
    btnLogin.click('Try/showLogin');

    // listen to custom event
    self.addEventListener('winTap', C.App.applyAction('Try/doManual', 'x', 1, true));

    // add button into selfdow
    self.add(btnTest);
    self.add(btnLogin);
    self.add(btnChoose);
    self.add(btnAjax);

    return self;
}

module.exports = mainWin;
