(function() {
  'use strict';

  angular
    .module('irstore')
    .controller('ProductController', ProductController);

  /** @ngInject */
  function ProductController($rootScope, $state, storeApi, toastr) {
    var vm = this;

    vm.$rootScope = $rootScope;
    vm.$state = $state;
    vm.storeApi = storeApi;
    vm.toastr = toastr;

    vm.product = {};

    /* fetch the product on load */
    fetchProduct();

    this.addProduct = addProduct;
    this.removeProduct = removeProduct;

    /* fetch the product from id */
    function fetchProduct() {
      vm.storeApi.getProduct(vm.$state.params.id).then(function(item) {
        vm.product = item;
      });
    }

    /* add to cart */
    function addProduct(item) {
      vm.storeApi.addProduct(item).then(function(response) {
        /* message */
        (response.status === 202) && vm.toastr.success(item['name'], 'Added!', {
          timeOut: 1000
        });
        //change local
        vm.product['isAdded'] = !vm.product['isAdded'];
        changeCart();
      });
    }

    /* remove from cart */
    function removeProduct(item) {
      vm.storeApi.removeProduct(item).then(function(response) {
        (response.status === 202) && vm.toastr.warning('Removed ' + item['name'], {
          timeOut: 1000
        });
        //change local model
        vm.product['isAdded'] = !vm.product['isAdded'];
        changeCart();
      });
    }

    /* modify cart */
    function changeCart() {
      /* just trigger */
      vm.$rootScope.$broadcast('masterListChanged', {});
    }


  }
})();
