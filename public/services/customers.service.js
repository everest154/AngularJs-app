;(function () {
    'use strict';

    angular
        .module('model.customers', [])
        .service('customers', customers);

    customers.$inject = ['$http', 'url'];

    function customers($http, url) {

        return {
            getCustomers: getCustomers,
            createCustomer: createCustomer
        };

        function getCustomers() {
            return $http.get(url.customers.all)
                .then(function (res) {
                    return res;
                });
        }

        function createCustomer(data) {
            return $http.post(url.customers.all, data)
                .then(function (res) {
                    return res;
                });
        }

    }
})();