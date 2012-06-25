var config = {
    /** app mode **/
    mode: 'DEV',

    /** db name **/
    db: 'tiapp-exercise',

    /** Actions **/
    action: [
        {module: 'Try',     name: 'doSave',         path: 'Como.Controller.Try.doSave'},
        {module: 'Try',     name: 'showLogin',      path: 'Como.Controller.Try.showLogin'},
        {module: 'Try',     name: 'doLogin',        path: 'Como.Controller.Try.doLogin'},
        {module: 'Try',     name: 'doLogout',       path: 'Como.Controller.Try.doLogout'}
    ]
};

module.exports = config;
