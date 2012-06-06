//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
    alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
// include global namespace and functionality
Ti.include('/vendor/plugins/AppsCo/install.js');

// This is a single context application with mutliple windows in a stack
(function() {          
    var // create a window
        win = Ti.UI.createWindow({
            title: 'Window One',
            backgroundColor: '#bada55'
        }),
        // create a button
        btn = Ti.UI.createButton({
            height: '44dp',
            width: '200dp',
            title: 'Click Me!',
            top: '20dp'
        });
        
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
})();
