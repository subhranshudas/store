(function() {
  'use strict';

  angular
    .module('irstore')
    .controller('CartController', CartController);

  /** @ngInject */
  function CartController($rootScope, storeApi, toastr) {
    var vm = this;

    vm.$rootScope = $rootScope;
    vm.storeApi = storeApi;
    vm.toastr = toastr;

    vm.cartItems = [];
    vm.purchasedItems = [];
    vm.grandTotal = 0;

    /* load cart items initially */
    getCartItems();

    this.removeProduct = removeProduct;
    this.modifyCart = modifyCart;
    this.buyStuff = buyStuff;


    /* fetch items initially */
    function getCartItems() {
      vm.storeApi.getCartItems().then(function(cartItems) {
        vm.cartItems = cartItems;
      });
    }

    /* remove from the cart */
    function removeProduct(index) {
      vm.storeApi.removeProduct(vm.cartItems[index]).then(function(response) {
        (response.status === 202) && vm.toastr.warning('Removed ' + vm.cartItems[index]['name'], {
          timeOut: 1000
        });
        /* change local model */
        vm.cartItems = vm.cartItems.filter(function(it) {
          return it.id !== vm.cartItems[index].id
        });
        changeCart();
      });
    }

    function modifyCart(item) {
      vm.storeApi.modifyProducts(item).then(function(response) {
        //change local model
        for (var i = 0; i < vm.cartItems.length; i++) {
          if (vm.cartItems[i].id === item.id) {
            vm.cartItems[i] = item;
            break;
          }
        }
      });
    }
    /* modify cart */
    function changeCart() {
      /* just trigger */
      vm.$rootScope.$broadcast('masterListChanged', {});
    }

    function buyStuff() {
      vm.purchasedItems = angular.copy(vm.cartItems);
      vm.storeApi.purchaseItems(vm.purchasedItems).then(function(response) {
        (response.status === 202) && vm.toastr.success('Your Purchase is Complete! ', 'Done', {
          timeOut: 3000
        });
        //make local changes
        //set total
        for (var i = 0; i < vm.purchasedItems.length; i++) {
          vm.grandTotal = vm.grandTotal + (vm.purchasedItems[i]['price'] * 1) * (vm.purchasedItems[i]['num'] * 1)
        }
        vm.cartItems = [];
        changeCart();
      });
    }

  }
})();
