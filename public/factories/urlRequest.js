(function () {
    'use strict';
    angular
        .module('factory.urlRequest', [])
        .factory('url', [
            function () {

                var baseUrl = 'http://localhost:8000/';
                return {
                    customers: {
                        all: baseUrl + 'api/customers'
                    },
                    products: {
                        all: baseUrl + 'api/products'
                    },

                    invoices: {
                        all: baseUrl + 'api/invoices',
                        one: baseUrl + 'api/invoices/'
                    }
                };
            }
        ]);
})();
