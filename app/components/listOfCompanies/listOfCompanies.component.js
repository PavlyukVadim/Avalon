export default ngModule => {
  ngModule.component('listOfCompanies', {
  	bindings: {
    	companies: '<'
  	},
  	controllerAs: 'listOfCompanies',
  	controller: listOfCompaniesController,
    templateUrl: '/components/listOfCompanies/listOfCompanies.template.html'
	});

	function listOfCompaniesController($http, $mdDialog) {
		const vm = this;

	  this.showTabDialog = function(ev, indexOfCompany) {
	  	console.log(indexOfCompany);
	  	this.indexOfCurrentCompany = indexOfCompany;
      $mdDialog.show({
	      controller: DialogController,
	      templateUrl: '/components/listOfCompanies/tabDialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true
	    })
      .then((answer) => {
      }, () => {});
	  };

		function DialogController($scope, $mdDialog) {
	    $scope.hide = () => {
	      $mdDialog.hide();
	    };

      $scope.cancel = () => {
	      $mdDialog.cancel();
	    };

	    $scope.answer = (answer) => {
	      $mdDialog.hide(answer);
	    };

	    const deleteCompany = () => {
	    	$scope.companies.splice($scope.indexOfCurrentCompany, 1);
	    	$scope.cancel(); 
	    };

	    $scope.companies = vm.companies;
	    $scope.indexOfCurrentCompany = vm.indexOfCurrentCompany;
	    $scope.deleteCompany = deleteCompany;
	  }
	}
}
