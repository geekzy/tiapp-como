// single context application,
// please include your main Window UI components here
(function () {
    // include components
    var // UI instances / vars
        win = require('/app/views/common/mainWin')(Como),
        UI = require('/lib/Como/UIShortcut'),
        square = UI.view({
            width: '100dp', height: '100dp',
            backgroundColor: '#272e12'
        }),
        twoD = Ti.UI.create2DMatrix(),
        anim = Ti.UI.createAnimation();

    // set 2D Matrix
    twoD.scale(1.5);
    twoD.rotate(20);
    // set animation
    anim.transform = twoD;
    anim.duration = 3000;
    anim.autoreverse = true;
    anim.repeat = 2;
    // listen to tap
    square.tap(function(e) {
        var src = e.source;
        if (src === square) {
            Ti.API.info('XXX');
            src.animate(anim);
        }
    });
    // add the square
    win.add(square);
    // open the window
    win.open();
}());
