
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
   * @param {function} fsDisable A function that determines if the checkbox item is disabled
   * @param {string} fsTemplate The template used to format the checkbox. By default {{item.name}} is used.
   * @param {string} fsClass The class to be applied to the md-checkbox-container
   * @param {expression} fsRequired Requires at least on checkbox to be selected to be valid in a form
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
               disabled: "=?fsDisabled",
               index: "=?fsIndex",
               template: "@fsTemplate",
               class: "@fsClass",
               required: "=?fsRequired"
            },
            controller: ['$scope',function($scope) {

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

            	$scope.name = fsUtil.guid();
            	$scope.checkboxesModel = {};
            	$scope.models = {};
            }],
            link: function($scope, element, attrs, ctrl) {

            	if($scope.required) {
            		angular.element(element).attr('required','required');
            	}

            	if(!$scope.model) {
            		$scope.model = [];
            	}

            	if(!$scope.template) {
            		$scope.template = '{{item.name}}';
            	}

            	if(!$scope.index) {
            		$scope.index = function(item) {
					    for(var i=0; i < $scope.model.length; i++) {
					        if(angular.equals($scope.model[i], item)) {
					            return i;
					        }
					    };
					    return -1;
            		}
            	}

            	if(!$scope.disabled) {
            		$scope.disabled = function(item) {
            			return false;
            		}
            	}

        		$scope.exists = function(item) {
        			return $scope.index(item)>=0;
        		}

                $scope.redirect = function(path) {
                    $location.path(path);
                }

                $scope.click = function(item) {

                	if(!$scope.disabled(item)) {

	                	var index = $scope.index(item);
	                	var items = angular.copy($scope.model);
	                	if(index>=0) {
	                		items.splice(index,1);
	                	} else {
	                		items.push(item);
	                	}

	                	$scope.model = items;
	                }
                }

            }
        };
    });
})();

angular.module('fs-angular-checkboxes').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/directives/checkboxes.html',
    "<md-checkbox-container class=\"{{class}}\" name=\"checkboxes_{{name}}\" ng-model=\"checkboxesModel\">\r" +
    "\n" +
    "    <label>{{label}}</label>\r" +
    "\n" +
    "    <div class=\"checkboxes\">\r" +
    "\n" +
    "\t    <md-checkbox\r" +
    "\n" +
    "\t        ng-repeat=\"item in items\"\r" +
    "\n" +
    "\t        ng-checked=\"exists(item)\"\r" +
    "\n" +
    "\t        ng-click=\"click(item)\"\r" +
    "\n" +
    "\t        ng-disabled=\"disabled(item)\"\r" +
    "\n" +
    "\t        ng-model=\"models[$index]\"\r" +
    "\n" +
    "\t        name=\"{{names[$index]}}\">\r" +
    "\n" +
    "\t        {{templates[$index]}}\r" +
    "\n" +
    "\t    </md-checkbox>\r" +
    "\n" +
    "\t</div>\r" +
    "\n" +
    "</md-checkbox-container>"
  );

}]);
