;(function () {
    'use strict';
    angular
        .module('app', [
            'app.core',
            'services.module',
            'factories.module'
        ])
        .run(runBlock);

    runBlock.$inject = ['$state'];
    function runBlock($state) {
        console.log(1)
    }
})();