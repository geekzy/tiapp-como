var config = {
    /** app mode **/
    mode: 'DEV',

    /** db name **/
    db: 'tiapp-exercise',

    /** Actions **/
    action: [
        {module: 'Try',     name: 'doSave',         path: 'AppsCo.Controller.Try.doSave'},
        {module: 'Try',     name: 'showLogin',      path: 'AppsCo.Controller.Try.showLogin'},
        {module: 'Try',     name: 'doLogin',        path: 'AppsCo.Controller.Try.doLogin'}
    ]
};

module.exports = config;
