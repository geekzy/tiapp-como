module.exports = (function () {
    "use strict";
    var // include underscore utility-belt
        _ = require('/lib/Underscore/underscore.min'),
        // utilities interface
        emptyFn = function () {},
        ajax, notty, extend, deviceOnline, filenameOfURL, execute;

    /**
     * Create a HTTP Client for accessing remote HTTP service
     */
    ajax = function (o) {
        var xhr, xhropt = {}, change, onload, onerror, download, upload,
            ajaxChangeEvt = 'ajax:change', ajaxDlEvt = 'ajax:download', ajaxUpEvt = 'ajax:upload',
            opt = _.extend({
                url: '#', data: {},
                type: 'GET',
                dataType: 'json',
                success: emptyFn, failure: emptyFn,
                download: emptyFn, upload: emptyFn,
                change: emptyFn,
                showProgress: true,
                sync: false/*,
                progess: <the progress bar to be notified>*/
            }, o || {}),
            // default progress bar
            progressUI = Ti.UI.createActivityIndicator({
                location: Titanium.UI.ActivityIndicator.DIALOG,
                type: Titanium.UI.ActivityIndicator.DETERMINANT,
                min: 0, max: 10,
                value: 0
            });

        /**
         * success method
         */
        onload = function (e) {
            var resp = this.responseText,
                status = this.statusText;

            if (!opt.progress) { progressUI.hide(); }
            else if (opt.progress.hide) {
                opt.progress.hide();
                if (opt.progress.fireEvent) {
                    opt.progress.fireEvent(ajaxChangeEvt, {complete: true});
                }
            }

            resp = opt.dataType === 'json' ? JSON.parse(resp) : resp
            // call user's callback
            opt.success.apply(this, [resp, status]);
        };

        /**
         * failure method
         */
        onerror = function (e) {
            var resp = this.responseText,
                status = this.statusText;

            if (!opt.progress) { progressUI.hide(); }
            else if (opt.progress.hide) {
                opt.progress.hide();
                if (opt.progress.fireEvent) {
                    opt.progress.fireEvent(ajaxChangeEvt, {failure: true});
                }
            }

            resp = opt.dataType === 'json' ? JSON.parse(resp) : resp
            // call user's callback
            opt.failure.apply(this, [resp, status]);
        };

        /**
         * ready state changed method
         */
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
                else if (opt.progress.fireEvent) { opt.progress.fireEvent(ajaxChangeEvt, {progress: progress}); }
            }

            // call user's callback
            opt.change.apply(this, [progress, state]);
        };

        /**
         * data stream method
         */
        download = function(e) {
            var progress = e.progress, state = this.readyState;
            // update defined progress value
            if (opt.progress) {
                if (opt.progress.value) { opt.progress.value = progress; }
                // fire event to update progress
                if (opt.progress.fireEvent) { opt.progress.fireEvent(ajaxDlEvt, {progress: progress}); }
            }

            // call user's callback
            opt.download.apply(this, [progress, state]);
        };

        /**
         * send stream method
         */
        upload = function(e) {
            var progress = e.progress, state = this.readyState;
            // update defined progress value
            if (opt.progress) {
                if (opt.progress.value) { opt.progress.value = progress; }
                // fire event to update progress
                if (opt.progress.fireEvent) { opt.progress.fireEvent(ajaxUpEvt, {progress: progress}); }
            }

            // call user's callback
            opt.upload.apply(this, [progress, state]);
        };

        // Assign callbacks
        xhropt.onload = onload;
        xhropt.onerror = onerror;
        xhropt.onreadystatechange = change;
        xhropt.ondatastream = download;
        xhropt.onsendstream = upload;

        // create the HTTPClient Object
        xhr = Ti.Network.createHTTPClient(xhropt);

        // show progress view
        if (!opt.progress) { progressUI.show(); }
        else if (opt.progress.show) { opt.progress.show(); }

        // Open Remote Connection
        xhr.open(opt.type, opt.url, !opt.sync);
        // Call Remote
        xhr.send(opt.data);
        return xhr;
    };

    /**
     * Function to show notification
     */
    notty = function (msg, duration) {
        Ti.UI.createNotification({
            message: msg || '',
            duration: duration || Ti.UI.NOTIFICATION_DURATION_SHORT
        }).show();
    };

    /**
     * Proxying underscore's object extend function to preserve defaults
     */
    extend = function (defaults, opts/*, more objects to extend*/) {
        var args = [{}, defaults, opts],
            objs = Array.prototype.slice.call(arguments).splice(2);
        [].push.apply(args, objs);
        return _.extend.apply(this, args);
    };

    /**
     * Get Filename of URL (last item of url)
     */
    filenameOfURL = function (url) {
        var chunk = url.split('/');
        return chunk.splice(chunk.length-1).join('');
    };

    /**
     * Check if device is online
     */
    deviceOnline = function() {
        return Ti.Network.online;
    };

    /**
     * Execute a function within a context
     */
    execute = function (fnName, context /*, args */) {
        var i, args = Array.prototype.slice.call(arguments).splice(2),
            namespaces = fnName.split("."),
            func = namespaces.pop(),
            ctx = context || window;

        for(i = 0; i < namespaces.length; i += 1) {
            ctx = ctx[namespaces[i]];
        }

        return ctx[func].apply(this, args);
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
          *      progess:       the progress UI Object to show/hide
          * @return {Object} the HTTPClient object
          */
        ajax: ajax,

        /**
         * Function to show notification
         * @param {String} msg the message to notify
         */
        notty: notty,

        /**
         * Proxying underscore's object extend function
         * to preserve defaults
         * @param {Object} defaults the base object to apply to
         * @param {Object} opts the custom attributes to apply to base (defaults)
         * @return {Object} the final merged/extended object
         */
        extend: extend,

        /**
         * Get Filename of URL (last item of url)
         * @param {String} url The URL to get its filename
         * @return {String} the filename of the URL
         */
        filenameOfURL: filenameOfURL,

        /**
         * Check if device is online
         * @return device connectivity status, true - online; false - offline
         */
        deviceOnline: deviceOnline,

        /**
         * Execute a function within a context
         * @param {String} functionName the function name/path
         * @param {Object} context the context of the function to execute
         */
        execute: execute
    };
}());
