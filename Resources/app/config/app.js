var config = {
    /** app mode **/
    mode: 'DEV',

    /** db name **/
    db: 'tiapp-como',

    /** android tablet minimum form factor **/
    tablet: {
        width: 899,
        height: 899
    },

    /** Actions **/
    action: [
        {module: 'Try',     name: 'doSave',         path: 'Como.Controller.Try.doSave'},
        {module: 'Try',     name: 'showLogin',      path: 'Como.Controller.Try.showLogin'},
        {module: 'Try',     name: 'doLogin',        path: 'Como.Controller.Try.doLogin'},
        {module: 'Try',     name: 'doLogout',       path: 'Como.Controller.Try.doLogout'},
        {module: 'Try',     name: 'doChoose',       path: 'Como.Controller.Try.doChoose'}
    ]
};

module.exports = config;
