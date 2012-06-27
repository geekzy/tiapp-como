function loginWin (C) {
    "use strict";
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // include UI Helper module
        UI = require('/lib/Como/UIShortcut')(C),
        // get user count
        userCount = C.Model.User.count(),
        // get user if exists
        user = userCount > 0 ? C.Model.User.findOneBy('id', 1) : false,

        scrolly = UI.scrolly({contentHeight:'auto'}),
        self = UI.win(C.App.extend(
            C.UI.win.common,
            {titleid: 'winLogin', backgroundColor: '#bada55'}
        )),

        userInText = UI.textfield(C.App.extend(
            C.UI.inputs.textfield,
            { id: 'userTxt', hintText: 'username', top: '20dp' }
        )),

        passInText = UI.textfield(C.App.extend(
            C.UI.inputs.textfield,
            { id:  'passTxt', hintText: 'password', top: '70dp', passwordMask: true }
        )),

        loginBtn = UI.button(
            C.UI.buttons.login,
            // Listen to tap events
            'Try/doLogin', scrolly, self
        ),
        winLogoutTitle = _.template(L('winLogout') + ' - <%=name%>');

    (function () {
        var users = C.Model.User.all();
        C.App.notty(C.Model.User.info());
        if (userCount > 0) {
            _.each(users, function(u) {
                C.App.notty('Found user' + u.display(), Ti.UI.NOTIFICATION_DURATION_LONG);
            });
        }

    }());

    // no logged in user
    if (userCount === 0) {
        // add form elements into view
        scrolly.add(userInText);
        scrolly.add(passInText);
        scrolly.add(loginBtn);
    }
    // got user
    else {
        self.setTitle(winLogoutTitle(user));
        loginBtn = UI.button(C.App.extend(
                C.UI.buttons.login,
                { titleid: 'btnLogout', top: '20dp' }
            ),
        // Listen to tap event
        'Try/doLogout', self);
        scrolly.add(loginBtn);
    }
    // add view into selfdow
    self.add(scrolly);

    return self;
}

module.exports = loginWin;
