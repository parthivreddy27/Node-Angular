var app = angular.module('angularjsNodejsTutorial',[]);
app.controller('myController', function($scope, $http) {
   	$scope.reviewFlag;

    $scope.get_reviews=function(){
    	$scope.reviewFlag = true;
    	$scope.loadingFlag = false;
    	if($scope.product_asin == undefined) {
    		alertMsg()
    	} else {
			var asin=$scope.product_asin.split('/').slice(-1)[0]

			if(asin.length !== 10 || asin == undefined){
				alertMsg()
			}else {

				var asinData = {
		    		asin :  asin
		    	}

				var request = $http.get('/data', {params: asinData});
				$scope.loadingFlag = true;    
			    request.success(function(data) {
			        $scope.data = data.reviews;
			        $scope.loadingFlag = false;
			    });
			    request.error(function(data){
			        console.log('Error: ' + data);
			    });
		    }
	    }
	}

	$scope.get_clear=function(){
		$scope.data = [];
		$scope.product_asin = '';
		$scope.reviewFlag = false;
	}

	$scope.sortColumn = "author";
	$scope.reverseSort = false;

	$scope.sortData = function(column){
		$scope.reverseSort = ($scope.sortColumn == column) ? !$scope.reverseSort: false;
		$scope.sortColumn = column;
	}

	function alertMsg(){
		$scope.get_clear();
		alert("Please enter the Amazon product url in below format only : https://www.amazon.com/SanDisk-Ultra-Class-Memory-SDSDUNC-032G-GN6IN/product-reviews/B0143RT8OY" )
	}
});