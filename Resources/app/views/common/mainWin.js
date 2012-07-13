module.exports = function (C) {
    "use strict";
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // include Como Utility
        $ = require('/lib/Como/Utils'),
        // include UI Helper module
        UI = require('/lib/Como/UIShortcut')(C),
        // include Progress Bar UI
        pBar = require('/app/views/common/progressBar')(C),

        // get user count
        loggedin = C.Model.User.count() > 0,

        // create a selfdow
        self = UI.win($.extend(
            // base (common) attributes
            C.UI.win.common,
            // cuctom attributes
            { titleid: 'winMain', exitOnClose: true }
        )),
        scrolly = UI.scrolly({contentHeight:'auto'}),
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
        btnDownload = UI.button($.extend(
            C.UI.buttons.badass,
            { titleid: 'btnDownload', top: '320dp' }
        )),
        btnCheckOnline = UI.button($.extend(
            C.UI.buttons.badass,
            { titleid: 'btnCheckOnline', top: '380dp' }
        )),
        // create option dialog
        optDlg = UI.optdialog({
          cancel: 1,
          titleid: 'optDlgTitle',
          options: [L('optConfirm'), L('optCancel'), L('optHelp')],
          selectedIndex: 1,
          destructive: 0
        }),
        progress = pBar.create({
            message: L('msgDownload')
        });

    // listen to tap event
    btnTest.tap('Try/doSave', btnTest.getHeight());
    btnChoose.tap(function() {
        optDlg.click('Try/doChoose');
        optDlg.show();
    });
    btnAjax.tap('Try/doAjax');
    btnDownload.tap('Try/doDownload', progress);
    btnCheckOnline.tap('Try/doCheckOnline');
    btnSwipe.swipe('Try/doSwipe');
    scrolly.taphold(function (e) {
        // prevent event bubbling from children's tap event
        if (e.source === scrolly) {
            Ti.API.info('Window Tapped!');
            // fire custom event
            var x = Math.round(Math.random()) === 1;
            scrolly.fireEvent('winTap', {p1: x ? 'xxx' : 'yyy'});
        }
    });

    // listen to click event
    btnLogin.click('Try/showLogin');

    // listen to custom event
    scrolly.addEventListener('winTap', C.App.applyAction('Try/doManual', 'x', 1, true));

    // listen to ajax download event
    progress.addEventListener('ajax:download', function(e) {
        var bar = e.source.children[1];
        bar.value = e.progress;
    });

    // add button into selfdow
    scrolly.add(btnTest);
    scrolly.add(btnLogin);
    scrolly.add(btnChoose);
    scrolly.add(btnAjax);
    scrolly.add(btnSwipe);
    scrolly.add(btnDownload);
    scrolly.add(progress);
    scrolly.add(btnCheckOnline);
    self.add(scrolly);

    return self;
};
