/**
 * Definition of UI attributes
 */
(function () {
    var _ = require('/lib/Underscore/underscore.min');
    _.extend(Como.UI, {

        win: {          // attributes for windows

            common: {   // common attributes for windows
                     fullscreen: true,
                backgroundColor: '#fff',
                   navBarHidden: false
            }

        },

        buttons: {      // attributes for buttons

            badass: {
                backgroundColor: '#bada55',
                         height: '44dp',
                          width: '200dp',
                            top: '20dp'
            },

            login: {
                backgroundColor: '#223344',
                        titleid: 'btnLogin',
                          color: '#ffffff',
                         height: '35dp',
                          width: '150dp',
                            top: '120dp'
            }

        },

        tabs: {},       // attributes for tabs

        labels: {},     // attributes for labels

        inputs: {       // attributes for inputs

            textfield: {
                keyboardType: Titanium.UI.KEYBOARD_ASCII,
                 borderStyle: Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,
                       color: '#336699',
                      height: '40dp',
                       width: '250dp'
            }

        }
        // etc

    });
}());
