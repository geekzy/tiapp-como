AppsCo.Model.User = (function () {
    "use strict";
    var m = {},
        tableMethod, recordMethod;

    m.table = 'user';
    m.columns = {
        id:     'INTEGER',
        name:   'TEXT',
        age:    'INTEGER'
    };
    m.methods = {
        tableMethod: tableMethod
    };
    m.objectMethods = {
        recordMethod: recordMethod
    };

    tableMethod = function () {
        Ti.API.info('Table method called');
    };

    recordMethod = function () {
        Ti.API.info('Record method called');
    };

    return m;
}());
