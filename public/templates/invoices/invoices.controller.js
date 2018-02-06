(function () {
    'use strict';
    angular
        .module('app')
        .controller('Invoices', Invoices);
    Invoices.$inject = ['allInvoices', '$mdDialog', 'customers', 'products', 'invoices', '$state'];

    function Invoices(allInvoices, $mdDialog, customers, products, invoices, $state) {
        var vm = this;
        vm.allInvoices = allInvoices.data;
        console.log(vm.allInvoices);
        vm.createInvoice = createInvoice;
        vm.deleteInvoices = deleteInvoices;


        function createInvoice() {
            products.getProducts().then(function (res) {
                vm.products = res.data;
            });
            customers.getCustomers().then(function (res) {
                vm.customers = res.data;
                $mdDialog.show({
                    controller: 'createInvoices',
                    controllerAs: 'vm',
                    templateUrl: 'components/create-invoice/create-invoice.html',
                    targetEvent: event,
                    clickOutsideToClose: true,
                    locals: {
                        allCustomers: vm.customers,
                        products: vm.products
                    }
                })
                    .then(function (res) {
                        vm.allInvoices.push(res);
                        console.log(res);
                    })
            })

        }

        function deleteInvoices(id, index) {
            invoices.deleteInvoice(id).then(function (res) {
                console.log(res);
                vm.allInvoices.splice(index, 1)
            });
        }
    }
})();
