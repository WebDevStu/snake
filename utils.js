


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

            scope[binding]._scope = scope;

            _.events[prop] = _.events[prop] || [];
            _.events[prop].push(scope[binding]);
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
            item.forEach(callback);
        } else {

            for (prop in item) {
                if (item.hasOwnProperty(prop)) {
                    callback(item[prop], prop);
                }
            }
        }
    }
};