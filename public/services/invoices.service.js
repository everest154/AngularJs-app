;(function () {
    'use strict';

    angular
        .module('model.invoices', [])
        .service('invoices', invoices);

    invoices.$inject = ['$http', 'url'];

    function invoices($http, url) {

        return {
            getInvoices: getInvoices,
            deleteInvoice: deleteInvoice,
            createInvoice: createInvoice
        };

        function getInvoices() {
            return $http.get(url.invoices.all)
                .then(function (res) {
                    return res;
                });
        }

        function deleteInvoice(data) {
            return $http.delete(url.invoices.one + data)
                .then(function (res) {
                    return res;
                })
        }

        function createInvoice(data) {
            return $http.post(url.invoices.all, data)
                .then(function (res) {
                    return res
                })
        }

    }
})();