function mainWin (C) {
    "use strict";
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // include Como Utility
        $ = require('/lib/Como/Utils'),
        // include UI Helper module
        UI = require('/lib/Como/UIShortcut')(C),

        // get user count
        loggedin = C.Model.User.count() > 0,

        // create a selfdow
        self = UI.win($.extend(
            // base (common) attributes
            C.UI.win.common,
            // cuctom attributes
            { titleid: 'winMain', exitOnClose: true }
        )),
        // create a button
        btnTest = UI.button($.extend(
            C.UI.buttons.badass,
            { titleid: 'btnTest', abc: 'xyz' }
        )),
        btnLogin = UI.button($.extend(
            C.UI.buttons.badass,
            { titleid: (loggedin ? 'btnUser' : 'btnLogin'), top: '80dp' }
        )),
        btnChoose = UI.button($.extend(
            C.UI.buttons.badass,
            { titleid: 'btnChoose', top: '140dp' }
        )),
        btnAjax = UI.button($.extend(
            C.UI.buttons.badass,
            { titleid: 'btnAjax', top: '200dp' }
        )),
        btnSwipe = UI.button($.extend(
            C.UI.buttons.badass,
            { titleid: 'btnSwipe', top: '260dp' }
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
    btnSwipe.addEventListener('swipe', C.App.applyAction('Try/doSwipe'));
    self.taphold(function (e) {
        // prevent event bubbling from children's tap event
        if (e.source === self) {
            Ti.API.info('Window Tapped!');
            // fire custom event
            var x = Math.round(Math.random()) === 1;
            self.fireEvent('winTap', {p1: x ? 'xxx' : 'yyy'});
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
    self.add(btnSwipe);

    return self;
}

module.exports = mainWin;
