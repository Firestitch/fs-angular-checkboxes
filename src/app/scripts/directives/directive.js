(function () {
    'use strict';

    angular.module('fs-angular-checkboxes',['fs-angular-array','fs-angular-util'])
    .directive('fsCheckboxes', function(fsArray, fsUtil, $interpolate) {
        return {
            templateUrl: 'views/directives/checkboxes.html',
            restrict: 'E',
            replace: true,
            scope: {
               label: "@fsLabel",
               items: "=fsItems",
               model: "=fsModel",
               index: "=?fsIndex",
               template: "@fsTemplate"
            },

            link: function($scope, element, attrs, ctrl) {

            	if(!$scope.model) {
            		$scope.model = [];
            	}

            	if(!$scope.template) {
            		$scope.template = '{{item.name}}';
            	}

            	if(!$scope.index) {
            		$scope.index = function(item) {
            			return fsArray.indexOf($scope.model,item);
            		}
            	}

        		$scope.exists = function(item) {
        			return $scope.index(item)>=0;
        		}

                $scope.redirect = function(path) {
                    $location.path(path);
                }

                $scope.click = function(item) {
                	var index = $scope.index(item);
                	if(index>=0) {
                		$scope.model.splice(index,1);
                	} else {
                		$scope.model.push(item);
                	}
                }

                $scope.names = [];
                $scope.templates = [];
                $scope.$watch('items',function(items) {
                	if(items) {
                		angular.forEach(items,function(item,idx) {
	                		$scope.names[idx] = 'checkbox_' + fsUtil.guid();
	                		$scope.templates[idx] = $interpolate($scope.template)({ item: item });
	                	});
	                }
                });
            }
        };
    });
})();