(function() {
    
    // common apply function for events
    var handlerFn;       
    
    handlerFn = function(evtName) {
        return function() {
            var applyFn, args = arguments;
            
            applyFn = function(e) {
                [].push.apply(args, [e]);        
                AppsCo.App.act.apply(this, args);
            };
            
            this.addEventListener(evtName, applyFn);
        };
    };
    
    // Extend existing Ti Objects : Button.click
    Ti.UI.Button.prototype.click = handlerFn('click');
    // Extend existing Ti Objects : Button.tap
    Ti.UI.Button.prototype.tap = handlerFn('touchstart');
    // Extend existing Ti Objects : Button.taphold
    Ti.UI.Button.prototype.taphold = handlerFn('longpress'); 
    // Extend existing Ti Objects : Button.swipe
    Ti.UI.Button.prototype.swipe = handlerFn('swipe');
}());