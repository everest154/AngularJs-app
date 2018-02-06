;(function () {
    'use strict';

    angular
        .module('model.products', [])
        .service('products', products);

    products.$inject = ['$http', 'url'];

    function products($http, url) {

        return {
            getProducts: getProducts
        };

        function getProducts() {
            return $http.get(url.products.all)
                .then(function (res) {
                    return res;
                });
        }
    }
})();