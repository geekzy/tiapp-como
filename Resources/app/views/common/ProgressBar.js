module.exports = function (Como, opts) {
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // include UI Helper module
        UI = require('/lib/Como/UIShortcut').init(Como);

    opts = _.extend({
        width: '75%',
        backgroundColor: '#333',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: '#666',
        message: 'Downloading File',
        font: { fontSize: 12, fontWeight: 'bold' },
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        color: '#fff',
        min: 0,
        max: 1,
        value: 0,
        style: Titanium.UI.iPhone.ProgressBarStyle.PLAIN,
    }, opts || {});

    var self, pbar, msg;
    self = UI.view({
        width: opts.width,
        height: '65dp',
        backgroundColor: opts.backgroundColor,
        borderRadius: opts.borderRadius, borderWidth: opts.borderWidth,
        borderColor: opts.borderColor,
        // hide the view initially
        visible: false
    });
    msg = UI.label({
        text: opts.message,
        font: opts.font,
        width: '95%',
        textAlign: opts.textAlign,
        color: opts.color,
        top: '5dp'
    });
    pbar = UI.progressbar({
        width: '95%',
        height: '50dp',
        min: opts.min,
        max: opts.max,
        value: opts.value,
        style: opts.style,
        bottom: '5dp'
    });
    self.add(msg);
    self.add(pbar);

    // show the bar initially
    pbar.show();
    // return the UI
    return self;
};