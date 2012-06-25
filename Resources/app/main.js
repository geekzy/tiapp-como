// single context application,
// please include your main Window UI components here
(function () {
    // include components
    var // UI instances / vars
        win = require('/app/views/common/mainWin')(Como);
    // open the window
    win.open();
}());
