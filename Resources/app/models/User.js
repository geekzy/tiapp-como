module.exports = function (Como) {
    "use strict";
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // default required namespace
        m = {}, setup,
        // custom method namespace
        info, display;

    setup = function () {
        // Table name
        m.table = 'user';

        // Table Columns
        m.columns = {
            id:     'INTEGER PRIMARY KEY',
            name:   'TEXT',
            pass:   'TEXT'
        };

        /**
         * Declare Table based method(s) here
         */
        m.methods = {
            info: info
        };

        /**
         * Declare Record based method(s) here
         */
        m.objectMethods = {
            display: display
        };

        return new Como.db.model(m);
    };

    /**
     * Display info of the table
     */
    info = function () {
        return 'Load Table['+ this.table +'] from DB';
    };

    /**
     * Display info of current record
     */
    display = function () {
        var user = this,
            tmpl = _.template([
                '[name => <%=name%>, ',
                'pass => <%=pass%>, ',
                'id => <%=id%>]'
            ].join(''));
        return tmpl(user);
    };

    return setup();
};
