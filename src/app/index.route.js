(function() {
  'use strict';

  angular
    .module('irstore')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    /* Entry Page, List view */
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });
    /* Product Page, Detailed view */
    $stateProvider
      .state('product', {
        url: '/product/:id',
        templateUrl: 'app/product/details.html',
        controller: 'ProductController',
        controllerAs: 'prod'
      });

    /* Cart Page */
    $stateProvider
      .state('cart', {
        url: '/cart',
        templateUrl: 'app/cart/cart.html',
        controller: 'CartController',
        controllerAs: 'cart'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
