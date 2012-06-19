// Shortcuts Definition
function view(opts, tapAct/*, tapArgs*/) {
    return Ti.UI.createView(opts);
}

function scrolly(opts, tapAct/*, tapArgs*/) {
    return Ti.UI.createScrollView(opts);
}

function label(opts, tapAct/*, tapArgs*/) {
    return Ti.UI.createLabel(opts);
}

function textfield(opts, tapAct/*, tapArgs*/) {
    return Ti.UI.createTextField(opts);    
}

function textarea(opts, tapAct/*, tapArgs*/) {
    return Ti.UI.createTextArea(opts);    
}

function image(opts, tapAct/*, tapArgs*/) {
    return Ti.UI.createImageView(opts);
}

function win(opts, tapAct/*, tapArgs*/) {
    return Ti.UI.createWindow(opts);
}

function button(opts, tapAct/*, tapArgs*/) {
    var btn = Ti.UI.createButton(opts),
        args = Array.prototype.slice.call(arguments).splice(1);
    
    if (tapAct) { btn.tap.apply(btn, args); }
    return btn;
}

// Public API
exports.view = view;
exports.scrolly = scrolly;
exports.label = label;
exports.textfield = textfield;
exports.textarea = textarea;
exports.image = image;
exports.win = win;
exports.button = button;