'use strict';


angular.module('app')
  .controller('DemoCtrl', function ($scope) {

  	$scope.model = [];

    $scope.items = [{ id: 1, name: 'Checkbox1' },
    				{ id: 2, name: 'Checkbox1' },
    				{ id: 3, name: 'Checkbox3' },
    				{ id: 4, name: 'Checkbox4' }];

    $scope.submit = function() {
    	debugger;
        alert('submit');
    }

    $scope.disabled = function(item) {
    	return item.id == 3;
    }
});
