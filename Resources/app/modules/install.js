// Load Models (Tables)
Ti.include('/app/modules/models/load.js');
_.each(AppsCo.Model, function(v, k) { AppsCo.Model[k] = new joli.model(v); });
joli.models.initialize();

// Load Modules (Controllers + Views)
Ti.include('/app/modules/Try.js');