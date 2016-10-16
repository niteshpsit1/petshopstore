app.controller('storeController',function($scope, $http, $rootScope){

	$scope.orders = [];
	$scope.pets = [];
	$scope.selection = [];
	$scope.selectionPets = [];
	$scope.total = 0;

	$http.get('pets')
	.then(function(response){
		if(response.data.message === "ok")
			$scope.pets = response.data.result;
	});
	
	$scope.getOrders = function(){
		$http.get('orders',{
			headers: { 'access_token':localStorage.getItem('isLogin_token')}
		})
		.then(function(response){
			if(response.data.message === "ok")
				$scope.orders = response.data.result;
			else {
				$scope.message = "Nothing to display sorry";
			}
		});
	}
	$scope.getOrders();
	$scope.placeOpder = function(task){

		var data = {
			pets: $scope.selection,
			total: $scope.total,
			access_token: localStorage.getItem('isLogin_token')
		};
		$http.post('orders',data).then(function(response){
			if(response.data.message == "ok"){
				alert("Order Place Successfully ...");
				$scope.selection = []
				total: $scope.total = 0;
				$scope.getOrders();
			}else{
				alert("Order failed please try again...");
			}
		});
	}

	$scope.toggleSelection = function toggleSelection(petId) {
		var idx = $scope.selection.indexOf(petId);
		var pet = $scope.pets.filter(function(pet){ 
		   return pet._id == petId
		});
		
		if (idx > -1) {
			$scope.selection.splice(idx, 1);
			$scope.total = $scope.total - pet[0].cost;
		}
		else {
			$scope.selection.push(petId);
			$scope.total = $scope.total + pet[0].cost
		}
		$scope.selectionPets = $scope.pets.filter(function(pet){
			return $scope.selection.indexOf(pet._id) > -1
		})
	};
});