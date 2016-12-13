(function() {
  'use strict';

  angular
    .module('irstore')
    .service('storeApi', storeApi);

  /** @ngInject */
  function storeApi($q, $timeout) {

    var service = this;

    service.$q = $q;
    service.$timeout = $timeout;

    /* Since i don't have any backend, i am using service objects to maintain a local DB */
    service.products = [
      {
        'id': 1,
        'name': 'iPhone7',
        'price': 100,
        'isAdded': false,
        'num': 0
      },
      {
        'id': 2,
        'name': 'Samsung Galaxy',
        'price': 46,
        'isAdded': false,
        'num': 0
      },
      {
        'id': 3,
        'name': 'LG Optimus',
        'price': 42,
        'isAdded': false,
        'num': 0
      },
      {
        'id': 4,
        'name': 'Sony Xperia',
        'price': 52,
        'isAdded': false,
        'num': 0
      },
      {
        'id': 5,
        'name': 'Microsoft Lumia',
        'price': 57,
        'isAdded': false,
        'num': 0
      },
      {
        'id': 6,
        'name': 'Xiomi Red',
        'price': 35,
        'isAdded': false,
        'num': 0
      },
      {
        'id': 7,
        'name': 'Micromax Canvas',
        'price': 38,
        'isAdded': false,
        'num': 0
      }
    ];

    service.cartItems = [];

    /* to keep history of purchases */
    service.purchaseHistory = [];

    this.getProducts = getProducts;
    this.getProduct = getProduct;
    this.addProduct = addProduct;
    this.removeProduct = removeProduct;
    this.modifyProducts = modifyProducts;
    this.getCartItems = getCartItems;
    this.purchaseItems = purchaseItems;


    /* methods */

    /* fetch products from master list */
    function getProducts() {
      var deferred = service.$q.defer();
      /* to dettach references and act only as data sender */
      deferred.resolve(angular.copy(service.products));
      return deferred.promise;
    }

    function getProduct(id) {
      var deferred = service.$q.defer();
      /* to dettach references and act only as data sender */
      deferred.resolve(angular.copy(service.products.filter(function(item) {
        return item.id === id * 1;
      })[0]));
      return deferred.promise;
    }

    /* modify master list's object */
    function addProduct(item) {
      var deferred = service.$q.defer();
      for (var i = 0; i < service.products.length; i++) {
        if (service.products[i].id === item.id) {
          ++service.products[i].num;
          service.products[i].isAdded = !service.products[i].isAdded;
          break;
        }
      }
      deferred.resolve({
        status: 202
      });
      return deferred.promise;
    }

    /* modify master list's object */
    function removeProduct(item) {
      var deferred = service.$q.defer();
      for (var i = 0; i < service.products.length; i++) {
        if (service.products[i].id === item.id) {
          --service.products[i].num;
          service.products[i].isAdded = !service.products[i].isAdded;
          break;
        }
      }
      deferred.resolve({
        status: 202
      });
      return deferred.promise;
    }

    /* modify product in the master list */
    function modifyProducts(item) {
      var deferred = service.$q.defer();
      for (var i = 0; i < service.products.length; i++) {
        if (service.products[i].id === item.id) {
          service.products[i] = item;
          break;
        }
      }
      deferred.resolve({
        status: 202
      });
      return deferred.promise;
    }

    /* filter added items */
    function getCartItems() {
      var deferred = service.$q.defer();
      deferred.resolve(service.products.filter(function(item) {
        return item.isAdded;
      }));
      return deferred.promise;
    }

    function purchaseItems(soldItems) {
      var deferred = service.$q.defer();

      //reset all products in the master list
      for (var i = 0; i < service.products.length; i++) {
        service.products[i]['isAdded'] = false;
        service.products[i]['num'] = 0;
      }


      /* Just for Fun */
      service.purchaseHistory.push({
        id: (new Date()).toISOString(),
        items: soldItems
      });

      deferred.resolve({
        status: 202
      });
      return deferred.promise;
    }

  }

})();
