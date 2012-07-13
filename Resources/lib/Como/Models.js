module.exports = function (Como) {
    var models = {},
        // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min');

    _.each(Como.config.models, function (m) {
        var _m = require('/app/models/' + m.name),
            mName = m.name.toLowerCase();

        models[mName] = new _m(Como);
        //if (m.truncate) { models[mName].truncate(); }
    });

    return models;
};
