function applyEvt(ui, evtName, args) {
    args = Array.prototype.slice.call(args).splice(1);
    ui[evtName].apply(ui, args);
}

// Shortcuts Definition
function view(opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createView(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

function scrolly(opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createScrollView(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

function label(opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createLabel(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

function textfield(opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createTextField(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments) }
    return cmp;
}

function textarea(opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createTextArea(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

function image(opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createImageView(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

function win(opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createWindow(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

function button(opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createButton(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

function picker(opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createPicker(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

function indicator(opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createActivityIndicator(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
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
exports.picker = picker;
exports.indicator = indicator;