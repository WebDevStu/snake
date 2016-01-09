


var _ = {

    /**
     * events object
     */
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


    /**
     * trigger
     * triggers the subscribed methods in the events object
     *
     * @param trigger {String}
     */
    trigger: function (trigger) {

        var args = _.toArray(arguments).slice(1);

        if (_.events[trigger]) {
            _.forEach(_.events[trigger], function (fn) {
                fn.apply(fn._scope || this, args);
            });
        }
    },


    /**
     * forEach
     * wrapper to for each both arrays and objects
     *
     * @param item {Array|Object}
     * @param predicate {Function}
     * @param scope {Object} !optional
     */
    forEach: function (item, predicate, scope) {

        var prop;

        if (typeof item !== 'object') {
            throw new Error('not an iteratable source');
        }

        if (item instanceof Array) {
            item.forEach(predicate, scope);
        } else {

            for (prop in item) {
                if (item.hasOwnProperty(prop)) {
                    if (scope) {
                        predicate.call(scope, item[prop], prop);
                    } else {
                        predicate(item[prop], prop);
                    }
                }
            }
        }
    },


    /**
     * toArray
     *
     * @param item
     * @returns {Array}
     */
    toArray: function (item) {
        return Array.prototype.slice.call(item);
    }
};