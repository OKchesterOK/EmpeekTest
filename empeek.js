angular.module('empeekApp', [])
	.controller('empeekController', ['$scope', function($scope) {

		$scope.commentIndex = 0;
		$scope.items = [];
		$scope.arr = [];

		if (window.localStorage) {
			var items = window.localStorage.getItem("items");
			if (items) {
				$scope.items = JSON.parse(items);
			} else {
				$scope.items = [{
					"name": "Lorem Ipsum",
					"comments": ["A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s", "A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980sA variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980sA variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s"]
				}, {
					"name": "Ipsum Lorem",
					"comments": ["A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, , when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s", "A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, , when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s" ,"A variation of the ordinary lorem ipsum text has been used in typesetting since the 1960s or earlier, when it was popularized by advertisements for Letraset transfer sheets. It was introduced to the Information Age in the mid-1980s"]
				}];
			}
		}

		$scope.addItem = function () {
			$scope.items.push({name: $scope.itemName, comments: []});
			$scope.itemName = '';
			saveToLocalStorage();
		};

		$scope.removeItem = function (item) {
			$scope.items.splice($scope.items.indexOf(item), 1);
			saveToLocalStorage();
		};

		$scope.clickItem = function (item) {
			$scope.commentIndex = $scope.items.indexOf(item);
			$scope.arr = $scope.items[$scope.commentIndex].comments;
			setActiveElement($scope.commentIndex);
			return $scope.items[$scope.commentIndex].comments;
		};

		$scope.addComments = function () {
			if ($scope.text) {
				$scope.arr.push(this.text);
				$scope.text = '';
				saveToLocalStorage();
			}
		};

		function saveToLocalStorage () {
			if (window.localStorage) {
				window.localStorage.setItem("items", JSON.stringify($scope.items));
			}
		}

		function setActiveElement (index) {
			$scope.items = $scope.items.map(function (item) {
				item.isActive = false;
				return item;
			});
			$scope.items[index].isActive = true;
		}

		if ($scope.items[0]) {
			$scope.clickItem($scope.items[0]);
		}

	}
	]);