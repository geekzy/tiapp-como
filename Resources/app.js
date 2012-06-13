//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
    alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
// define global object
var global = this;

// include Underscore
Ti.include('/vendor/plugins/Underscore/install.js');

// include global namespace and functionality
Ti.include('/vendor/plugins/AppsCo/install.js');

// include modules
Ti.include('/app/modules/install.js');

// include main script
Ti.include('/app/main.js');
