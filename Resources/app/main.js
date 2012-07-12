// single context application,
// please include your main Window UI components here
(function () {
    "use strict";
    // include Como as singleton and initialize it
    var Como = require('/lib/Como/Core').init(),
        // include models
        Models = require('/lib/Como/Models'),
        // include main window
        MainWindow = require('/app/views/MainWindow');

    // initialize models
    new Models(Como);
    Como.joli.models.initialize();

    new MainWindow(Como).open();
}());
