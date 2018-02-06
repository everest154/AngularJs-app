(function () {
    'use strict';
    angular
        .module('app')
        .controller('createInvoices', createInvoices);
    createInvoices.$inject = ['$mdDialog', 'allCustomers', 'customers', 'products', 'invoices', '$state'];

    function createInvoices($mdDialog, allCustomers, customers, products, invoices, $state) {
        var vm = this;
        vm.Allcustomers = allCustomers;
        console.log(vm.Allcustomers);
        vm.allProducts = products;
        vm.selectedProducts = [];
        vm.allData = {};
        vm.allDataCustomers = {};
        vm.valueDiscount = 0;
        vm.total = 0;
        vm.value = false;
        vm.closeDialog = closeDialog;
        vm.getSelectedProduct = getSelectedProduct;
        vm.showValue = showValue;
        vm.getTotalDiscount = getTotalDiscount;
        vm.checkValue = checkValue;
        vm.raiseValue = raiseValue;
        vm.cancelPurchase = cancelPurchase;
        vm.decreaseValue = decreaseValue;
        vm.createNewInvoice = createNewInvoice;
        vm.changeValue = changeValue;
        vm.createNewCustomer = createNewCustomer;

        function changeValue() {
            vm.value = !vm.value;
        }

        function closeDialog() {
            $mdDialog.hide();
            console.log(vm.allData);
        }

        function showValue() {
            console.log(vm.value)
        }

        function getSelectedProduct(product, $index) {
            product.count = 1;
            vm.selectedProducts.push(product);
            vm.allProducts.splice($index, 1);
            calculateDiscount();
        }

        function cancelPurchase(product, $index) {
            vm.allProducts.push(product);
            vm.selectedProducts.splice($index, 1);
            calculateDiscount();
        }

        function createNewCustomer() {
            if (vm.registerCustomerForm.$invalid) {
                vm.value = true;
                toastr.warning("Fields can't be empty");
                return;
            }
            var existed;
            angular.forEach(vm.Allcustomers, function (e) {
                if (vm.allDataCustomers.name === e.name) {
                    existed = true;
                }
            });
            if (existed) {
                toastr.warning("This user already exists");
                vm.value = true;
                return
            }
            customers.createCustomer(vm.allDataCustomers)
                .then(function (res) {
                    vm.Allcustomers.push(res.data);
                });
        }

        function getTotalDiscount() {
            vm.totalDiscount = vm.total - ((vm.total * vm.valueDiscount) / 100);
            if (!vm.totalDiscount) {
                vm.totalDiscount = '';
            }
            vm.totalDiscount = Math.floor(vm.totalDiscount * 100) / 100;

            return vm.totalDiscount.toFixed(2);
        }

        function checkValue() {
            if (!vm.valueDiscount) {
                vm.valueDiscount = 0
            }
        }

        function raiseValue(product) {
            product.count++;
            calculateDiscount();
            console.log(vm.selectedProducts, product);
        }

        function decreaseValue(product) {
            product.count--;
            calculateDiscount();
        }

        function calculateDiscount() {
            var totalDiscount = 0;
            for (var i = 0; i < vm.selectedProducts.length; i++) {
                totalDiscount += (vm.selectedProducts[i].price * vm.selectedProducts[i].count);
            }
            vm.total = totalDiscount;
        }

        function createNewInvoice() {
            if (vm.createInvoiceForm.$invalid) {
                toastr.warning("Fields can't be empty");
                return;
            }

            invoices.createInvoice({
                id: vm.allData.customer.id,
                discount: vm.valueDiscount,
                total: vm.totalDiscount
            }).then(function (res) {
                $mdDialog.hide(res.data);
            });
        }
    }

})();
