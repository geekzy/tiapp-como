// This is a single context application with mutliple windows in a stack
(function() {
    var Win = require('/app/ui/common/AppWin');
    
    if (AppsCo.App.isTablet) {
        Win = require('/app/ui/tablet/AppWin');
    }
              
    var // create a window
        win = new Win('Window One'),
        // create a button
        btn = Ti.UI.createButton(_.extend({
            height: '44dp',
            width: '200dp',
            title: 'Click Me!',
            top: '20dp',
            abc: 'xyz'
        }, AppsCo.App.ui.buttons.test));

    // listen to click event
    btn.tap('Try/doSave', btn.getHeight());
    Ti.Gesture.addEventListener('shake', function(e) {
        alert('shaken at ' + e.timestamp);
    });
    // add button into window
    win.add(btn);
    // open the window
    win.open();
}());