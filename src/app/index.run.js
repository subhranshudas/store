(function() {
  'use strict';

  angular
    .module('irstore')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
