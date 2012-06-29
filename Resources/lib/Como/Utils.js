module.exports = (function () {
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        emptyFn = function () {}, evtName = 'ajax:change',

        // utilities interface
        ajax;

    ajax = function (o) {
        var xhr, xhropt = {}, change, onload, onerror,
            opt = _.extend({
                url: '#', data: {},
                type: 'GET',
                dataType: 'json',
                success: emptyFn, failure: emptyFn,
                download: emptyFn, upload: emptyFn,
                change: emptyFn,
                showProgress: true/*,
                progess: <the progress bar to be notified>*/
            }, o || {}),
            // default progress bar
            progressUI = Ti.UI.createActivityIndicator({
                location: Titanium.UI.ActivityIndicator.DIALOG,
                type: Titanium.UI.ActivityIndicator.DETERMINANT,
                min: 0, max: 10,
                value: 0
            });

        onload = function (e) {
            var resp = this.responseText,
                status = this.statusText;

            if (!opt.progress) { progressUI.hide(); }
            else if (opt.progress.fireEvent) {
                opt.progress.fireEvent(evtName, {complete: true});
            }

            resp = opt.dataType === 'json' ? JSON.parse(resp) : resp
            // call user's callback
            opt.success.apply(this, [resp, status]);
        };

        onerror = function (e) {
            var resp = this.responseText,
                status = this.statusText;

            if (!opt.progress) { progressUI.hide(); }
            else if (opt.progress.fireEvent) {
                e.failure = true;
                opt.progress.fireEvent(evtName, {failure: true});
            }

            resp = opt.dataType === 'json' ? JSON.parse(resp) : resp
            // call user's callback
            opt.failure.apply(this, [resp, status]);
        };

        change = function (e) {
            var progress = 0, state = this.readyState;
            switch (state) {
                case 0: // 20% - after HTTPClient declared, prior to open()
                    progress = 2;
                    break;
                case 1: // 40 % - open() has been called, now is the time to set headers
                    progress = 4;
                    break;
                case 2: // 60% - headers received, xhr.status should be available now
                    progress = 6;
                    break;
                case 3: // 80% - data is being received, onsendstream/ondatastream being called now
                    progress = 8;
                    break;
                case 4: // 100% - done, onload or onerror should be called now
                    progress = 10;
                    break;
            }

            if (opt.showProgress) {
                // update default progress value
                if (!opt.progress) { progressUI.setValue(progress); }
                // fire event to update progress
                else if (opt.progress.fireEvent) { opt.progress.fireEvent(evtName, {progress: progress}); }
            }

            // call user's callback
            opt.change.apply(this, [progress, state]);
        };

        xhropt.onload = onload;
        xhropt.onerror = onerror;
        xhropt.onreadystatechange = change;
        xhropt.ondatastream = opt.download;
        xhropt.onsendstream = opt.upload;

        xhr = Ti.Network.createHTTPClient(xhropt);

        // show progress view
        if (!opt.progress) { progressUI.show(); }
        else if (opt.progress.show) { opt.progress.show(); }

        xhr.open(opt.type, opt.url);
        xhr.send(opt.data);
        return xhr;
    };

    return {
         /**
          * Create a HTTP Client for accessing remote HTTP service
          * @param {Object} o the options for HTTP Client
          * Options are:
          *      url:           the URL to Connect, default is '#'.
          *      data:          the data object to pass to server, default is {}.
          *      type:          the method to use for connection, default is 'GET'.
          *      dataType:      the expecting response data type, default is 'json'.
          *      success:       the success function callback.
          *      failure:       the error function callback.
          *      download:      the stream download function callback.
          *      upload:        the stream upload function callback
          *      change:        the status change functio callback,
          *      showProgress:  the flag indicator to show the progress bar, true - show; false - hide,
          *      progess:       the progress UI to show/hide
          * @return {Object} the HTTPClient object
          */
        ajax: ajax
    };
}());
