(function () {
    'use strict';

  /**
   * @ngdoc directive
   * @name fs.directives:fs-checkboxes
   * @restrict E
   * @param {array} fsModel The model used to store the selected values
   * @param {array} fsItems The array of checkbox objects
   * @param {string} fsLabel The label above the checkboxes
   * @param {function} fsIndex A function to find the index of the checked object. By default the index is found by using indexOf().
   * @param {string} fsTemplate The template used to format the checkbox. By default {{item.name}} is used.
   */
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