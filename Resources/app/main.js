// This is a single context application with mutliple windows in a stack
(function() {
    var Win = require('/ui/common/AppWin');
    
    if (AppsCo.App.isTablet) {
        Win = require('/ui/tablet/AppWin');
    }
              
    var // create a window
        win = new Win('Window One'),
        // create a button
        btn = Ti.UI.createButton(_.extend({
            height: '44dp',
            width: '200dp',
            title: 'Click Me!',
            top: '20dp'
        }, AppsCo.App.ui.buttons.test));

    // listen to click event        
    btn.addEventListener('click', function() {
        AppsCo.App.act.call(this, 'Try/doSave');
    });
    // add button into window
    win.add(btn);
    // open the window
    win.open();
}());