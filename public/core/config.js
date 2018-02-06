(function () {
    'use strict';

    angular
        .module('app')
        .config(routeConfig);


    routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function routeConfig($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('invoices', {
                url: '/invoices',
                templateUrl: 'templates/invoices/invoices.html',
                controllerAs: 'vm',
                controller: 'Invoices',
                resolve: {
                    allInvoices: function (invoices) {
                        return invoices.getInvoices({})
                            .then(function (res) {
                                return res;
                            });
                    }
                }

            })
        $urlRouterProvider.otherwise('/invoices');
    }

})();
