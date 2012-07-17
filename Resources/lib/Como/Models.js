module.exports = function (Como) {
    var models = {},
        // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min');

    _.each(Como.config.models, function (m) {
        var obj = (typeof m === 'object'),
            _m = require('/app/models/' + (obj ? m.name : m)),
            mName = obj ? m.name.toLowerCase() : m.toLowerCase();

        models[mName] = new _m(Como);
    });

    return models;
};
