module.exports = function (Como, trigBtn) {
    "use strict";
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // include Como Utility
        $ = require('/lib/Como/Utils'),
        // load UI Helper
        UI = Como.loadUI(),

        // create a window
        self = new UI.win($.extend(
            Como.ui.win.common,
            {titleid: 'winLogin', backgroundColor: '#bada55'}
        )),
        // scroll view as container
        scrolly = new UI.scrolly({contentHeight: 'auto'}),
        // inputs
        userInText = new UI.textfield($.extend(
            Como.ui.inputs.textfield,
            { id: 'userTxt', hintText: 'username', top: '20dp' }
        )),
        passInText = new UI.textfield($.extend(
            Como.ui.inputs.textfield,
            { id:  'passTxt', hintText: 'password', top: '70dp', passwordMask: true }
        )),
        // buttons
        loginBtn = new UI.button(
            Como.ui.buttons.login,
            // Listen to tap events
            'Test/doLogin', scrolly, self, trigBtn
        ),
        // button logout title
        winLogoutTitle = _.template(L('winUser') + ' - <%=name%>'),
        // user table ref
        User = Como.db.models.get('user');

    (function () {
        var users = User.all();
        $.notty(User.info());
        if (User.count() > 0) {
            _.each(users, function(u) {
                $.notty('Found user' + u.display(), Ti.UI.NOTIFICATION_DURATION_LONG);
            });
        }
    }());

    // no logged in user
    if (User.count() === 0) {
        // add form elements into view
        scrolly.add(userInText);
        scrolly.add(passInText);
        scrolly.add(loginBtn);
    }
    // got user
    else {
        self.titleid = 'winUser';
        loginBtn = new UI.button($.extend(
                Como.ui.buttons.login,
                { titleid: 'btnLogout', top: '20dp' }
            ),
        // Listen to tap event
        'Test/doLogout', self, trigBtn);
        scrolly.add(loginBtn);
    }
    // add view into selfdow
    self.add(scrolly);

    return self;
};