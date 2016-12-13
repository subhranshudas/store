(function() {
  'use strict';

  angular
    .module('irstore')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($rootScope, $state, storeApi, toastr) {
    var vm = this;

    /* bind to controller */
    vm.storeApi = storeApi;
    vm.$rootScope = $rootScope;
    vm.$state = $state;
    vm.storeApi = storeApi;
    vm.toastr = toastr;

    /* master list */
    vm.products = [];

    fetchProducts();

    /* attach methods to the controller */
    this.modifyProducts = modifyProducts;
    this.goToProducts = goToProducts;
    this.setTitle = setTitle;


    /* fetch the products */
    function fetchProducts() {
      vm.storeApi.getProducts().then(function(products) {
        vm.products = products;
      }, function() {
        vm.toastr.error('Products could not be fetched!', 'Error', {
          timeOut: 5000
        });
      });
    }

    /* modify products */
    function modifyProducts(index) {
      if (!vm.products[index]['isAdded']) {
        vm.storeApi.addProduct(vm.products[index]).then(function(response) {
          /* message */
          (response.status === 202) && vm.toastr.success(vm.products[index]['name'], 'Added!', {
            timeOut: 1000
          });
          //change local model
          vm.products[index]['isAdded'] = !vm.products[index]['isAdded'];
          changeCart();
        });
      } else {
        vm.storeApi.removeProduct(vm.products[index]).then(function(response) {
          (response.status === 202) && vm.toastr.warning('Removed ' + vm.products[index]['name'], {
            timeOut: 1000
          });
          //change local model
          vm.products[index]['isAdded'] = !vm.products[index]['isAdded'];
          changeCart();
        });
      }
    }

    /* modify cart */
    function changeCart() {
      /* just trigger */
      vm.$rootScope.$broadcast('masterListChanged', {});
    }

    /* navigate to products page */
    function goToProducts(product) {
      $state.go("product", {
        id: product.id
      });
    }

    /* set item title */
    function setTitle(product) {
      debugger;
      return product.isAdded ? 'Remove' : 'Add';
    }



  }
})();
