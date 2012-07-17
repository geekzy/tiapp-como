module.exports = function (Como) {
    "use strict";
    var // get UIShortcut Factory
        UI = Como.loadUI(),
        // create a window
        self = new UI.win({
            title: L('winMain'),
            fullscreen: true,
            backgroundColor: '#fff',
            navBarHidden: false,
            exitOnClose: true
        }),
        // create a label
        hello = new UI.label({
            text: 'Hello World',
            color: '#bada55',
            font: { fontSize: '24dp', fontWeight: 'bold' },
            top: '50dp',
            width: Ti.UI.SIZE
        });


    self.add(hello);

    // return this window
    return self;
};
