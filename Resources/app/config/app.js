/* Application Framework scoped Configuration */
module.exports = {
    /** app mode **/
    mode: 'DEV',

    /** db name **/
    db: 'tiapp-como',

    /** remote app **/
    remote: 'http://110.74.169.145/',

    /** sdcard location **/
    sdcard: 'file:///mnt/sdcard/',

    /** android tablet minimum form factor **/
    tablet: {
        width: 899,
        height: 899
    },

    /** Models to load **/
    models: [
        {name: 'User', truncate: true}
    ]
};