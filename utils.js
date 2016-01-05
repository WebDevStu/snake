


var _ = {

    events: {},


    /**
     * @example:
     * {
     *      'binding:key': 'methodName',
     *      {string}     : {string}
     * }
     * @param bindings
     * @param scope
     */
    listenTo: function (bindings, scope) {

        _.forEach(bindings, function (method, binding) {

            try {
                scope[method]._scope = scope;
            } catch (e) {
                console.error('bound method does not exists');
            }
            _.events[binding] = _.events[binding] || [];
            _.events[binding].push(scope[method]);
        });
    },


    trigger: function (trigger) {

        if (_.events[trigger]) {
            _.forEach(_.events[trigger], function (fn) {

                if (fn._scope) {
                    fn.call(fn._scope);
                } else {
                    fn();
                }
            });
        }
    },


    forEach: function (item, callback, scope) {

        var prop;

        if (typeof item !== 'object') {
            throw new Error('not an iteratable source');
        }

        if (item instanceof Array) {
            item.forEach(callback, scope);
        } else {

            for (prop in item) {
                if (item.hasOwnProperty(prop)) {
                    if (scope) {
                        callback.call(scope, item[prop], prop);
                    } else {
                        callback(item[prop], prop);
                    }
                }
            }
        }
    }
};