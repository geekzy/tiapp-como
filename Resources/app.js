//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
    alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}

// include Underscore
//Ti.include('/vendor/plugins/Underscore/install.js');

// include global namespace and functionality
Ti.include('/vendor/plugins/AppsCo/install.js');

// This is a single context application with mutliple windows in a stack
(function() {
    var Win = require('/ui/common/AppWin');
    
    if (AppsCo.App.isTablet) {
        Win = require('/ui/tablet/AppWin');
    }
              
    var // create a window
        win = new Win('Window One'),
        // create a button
        btn = Ti.UI.createButton({
            height: '70dp',
            width: '200dp',
            title: 'Click Me!',
            top: '20dp',
            backgroundColor: '#bada55',
            backgroundImage: '/ui/button.png'
        });

    // listen to click event        
    btn.addEventListener('click', function() {
        var obj = _(['a', 'b', 'c']);
        obj.each(function(v) {
            Ti.API.log(v);
        });
        
        AppsCo.App.notty('OS['+ AppsCo.App.osname +'] Version['+ AppsCo.App.version +']');
        AppsCo.App.notty('Width['+ AppsCo.App.width +'] Height['+ AppsCo.App.height +']');
        AppsCo.App.notty((AppsCo.App.isTablet ? 'A' : 'NOT a') + ' Tablet');
    });
    // add button into window
    win.add(btn);
    // open the window
    win.open();
})();
