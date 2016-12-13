(function() {
  'use strict';

  angular
    .module('irstore')
    .directive('cartBar', cartBar);

  /** @ngInject */
  function cartBar() {
    var directive = {
      restrict: 'EA',
      templateUrl: 'app/components/cartBar/cartBar.html',
      scope: {
        creationDate: '='
      },
      controller: cartBarController,
      link: cartBarLinker,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function cartBarController($scope, storeApi) {
      var vm = this;
      vm.$scope = $scope;
      vm.storeApi = storeApi;

      vm.cartList = [];

      getCartItems();

      this.getCartItems = getCartItems;

      /* watch for change in list */
      vm.$scope.$on('masterListChanged', function(event, data) {
        vm.getCartItems();
      });

      /* fetch items initially */
      function getCartItems() {
        vm.storeApi.getCartItems().then(function(cartItems) {
          vm.cartList = cartItems;
        });
        console.log(vm.cartList);
      }
    }

    /** @ngInject */
    function cartBarLinker(scope, elem, attr, ctrl) {
      /* dom references */
      var $icon = elem.find('.cart-logo'),
        $cartBar = elem.find('.cartBar'),
        $contents = elem.find('.cart-contents');

      // /* close cart popup otherwise */
        // $cartBar.on('blur', function() {
        //   $contents.hasClass('open') && $contents.removeClass('open');
        // });

      $icon.on('click', function() {
        if (!$contents.hasClass('open')) {
          //$contents.addClass('open');
        }
      });
    }
  }

})();
