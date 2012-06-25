var // ui creation shortcuts
    view, scrolly, label, textfield, textarea,
    image, win, button, picker, indicator,
    applyEvt;

/**
 * Function to apply events to UI components
 * @param {Object} the Titanium.UI object to apply event to
 * @param {String} the event name to apply to
 * @param {Arguments} the arguments of the events
 */
applyEvt = function (ui, evtName, args) {
    args = Array.prototype.slice.call(args).splice(1);
    ui[evtName].apply(ui, args);
}

/**
 * Shortcut for Titanium.UI.View creation
 * @param opts the options for the UI
 * @param tapAct the action name apply to the UI tap event
 */
view = function (opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createView(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

/**
 * Shortcut for Titanium.UI.ScrollView creation
 * @param opts the options for the UI
 * @param tapAct the action name apply to the UI tap event
 */
scrolly = function (opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createScrollView(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

/**
 * Shortcut for Titanium.UI.Label creation
 * @param opts the options for the UI
 * @param tapAct the action name apply to the UI tap event
 */
label = function (opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createLabel(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

/**
 * Shortcut for Titanium.UI.TextField creation
 * @param opts the options for the UI
 * @param tapAct the action name apply to the UI tap event
 */
textfield = function (opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createTextField(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments) }
    return cmp;
}

/**
 * Shortcut for Titanium.UI.TextArea creation
 * @param opts the options for the UI
 * @param tapAct the action name apply to the UI tap event
 */
textarea = function (opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createTextArea(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

/**
 * Shortcut for Titanium.UI.ImageView creation
 * @param opts the options for the UI
 * @param tapAct the action name apply to the UI tap event
 */
image = function (opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createImageView(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

/**
 * Shortcut for Titanium.UI.Window creation
 * @param opts the options for the UI
 * @param tapAct the action name apply to the UI tap event
 */
win = function (opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createWindow(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

/**
 * Shortcut for Titanium.UI.Button creation
 * @param opts the options for the UI
 * @param tapAct the action name apply to the UI tap event
 */
button = function (opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createButton(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

/**
 * Shortcut for Titanium.UI.Picker creation
 * @param opts the options for the UI
 * @param tapAct the action name apply to the UI tap event
 */
picker = function (opts, tapAct/*, tapArgs*/) {
    var cmp = Ti.UI.createPicker(opts);
    if (tapAct) { applyEvt(cmp, 'tap', arguments); }
    return cmp;
}

/**
 * Shortcut for Titanium.UI.ActivityIndicator creation
 * @param opts the options for the UI
 * @param tapAct the action name apply to the UI tap event
 */
indicator = function (opts, tapAct/*, tapArgs*/) {
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