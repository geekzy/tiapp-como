var AppWin = function(title) {
    var self = Ti.UI.createWindow({
        title: title,
        backgroundColor: '#fff'
    });
    
    return self;    
};

module.exports = AppWin;