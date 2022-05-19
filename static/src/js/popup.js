odoo.define('popup_message_backend.backend_message', function (require) {
    "use strict";
    console.log('popup_message_backend.backend_message');
    var FormController = require('web.FormController');
    var ExtendFormController = FormController.include({
        saveRecord: function () {
            function parseURLParams(url) {
                var queryStart = url.indexOf("?") + 1,
                    queryEnd = url.indexOf("#") + 1 || url.length + 1,
                    query = url.slice(queryStart, queryEnd - 1),
                    pairs = query.replace(/\+/g, " ").split("&"),
                    parms = {}, i, n, v, nv;

                if (query === url || query === "") return;

                for (i = 0; i < pairs.length; i++) {
                    nv = pairs[i].split("=", 2);
                    n = decodeURIComponent(nv[0]);
                    v = decodeURIComponent(nv[1]);

                    if (!parms.hasOwnProperty(n)) parms[n] = [];
                    parms[n].push(nv.length === 2 ? v : null);
                }
                return parms;
            }
            var res = this._super.apply(this, arguments);
            if (this.modelName == 'popup.message.backend') {
                var self = this;
                res.then(function (changedFields) {
                    console.log(changedFields);
                    console.log(self.modelName);
                    self.do_notify('title', 'This is a notification');
                    // you can call a method on the server like this
                    self._rpc({
                        model: self.modelName,
                        method: 'search_read',
                        fields: ['name'],
                        context: self.context,
                    }).then(function (result) {
                        console.log('rpc result');
                        console.log(result);
                    })
                });
                let page_url = window.location.href
                page_url = page_url.replace('#', '?')
                let params = parseURLParams(page_url);

                console.log(params['id'][0]);


                // $(document).ready(function () {
                //     var rpc = require('web.rpc');

                //     $('#query').click(getProductBySKU);
                //     function getProductBySKU() {
                //         console.log("Hello world!");
                //         var domain = [('id', '=', 2)];
                //         var args = [domain];

                //         var res = rpc.query({
                //             model: 'product.template',
                //             method: 'search_read',
                //             args: [[], ['name', 'default_code']]
                //             /* args: args */
                //         }).then(function (products) {
                //             console.log(products);
                //         });
                //     };
                // });

            }
            return res;
        }
    });
});