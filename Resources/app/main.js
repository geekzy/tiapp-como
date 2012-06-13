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
        AppsCo.App.notty('OS['+ AppsCo.App.osname +'] Version['+ AppsCo.App.version +']');
        AppsCo.App.notty('Width['+ AppsCo.App.width +'] Height['+ AppsCo.App.height +']');
        AppsCo.App.notty((AppsCo.App.isTablet ? 'A' : 'NOT a') + ' Tablet');
    });
    // add button into window
    win.add(btn);
    // open the window
    win.open();
}());