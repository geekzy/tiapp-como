module.exports = function (C) {
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // include UI Helper module
        UI = require('/lib/Como/UIShortcut')(C),
        defaults = {
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
        }, buildUI, create;

    /**
     * Progress Bar Constructor
     * @param {Object} opts configurations of the Progress Bar
     */
    create = function (opts) {
        opts = _.extend(defaults, opts || {});
        return buildUI(opts);
    }

    /**
     * Build the UI based on the merged/extended configuration
     * @param {Object} opts configurations of the Progress Bar
     */
    buildUI = function (opts) {
        var view, pbar, msg;
        view = UI.view({
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
        view.add(msg);
        view.add(pbar);

        // show the bar initially
        pbar.show();
        // return the UI
        return view;
    }

    return {
        create: create
    }
};
