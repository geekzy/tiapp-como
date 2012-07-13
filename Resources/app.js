//bootstrap and check dependencies
if (Ti.version < 1.8) {

    alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');

} else if (Ti.Platform.osname === 'mobileweb') {

    alert('Mobile web is not yet supported by this template');

} else {

    Ti.include('/app/main.js');

}
