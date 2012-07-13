//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
    alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');
}
// define global object
var global = this;

// include Como as global namespace and functionality
Ti.include('/lib/Como/install.js');

// include models & controllers initially
Ti.include('/app/config/load.js');

// include main script
Ti.include('/app/main.js');
