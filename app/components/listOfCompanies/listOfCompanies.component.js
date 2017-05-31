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
	  	this.indexOfCurrentCompany = indexOfCompany;
      $mdDialog.show({
	      controller: DialogController,
	      templateUrl: '/components/listOfCompanies/tabDialog.tmpl.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose: true
	    })
      .then((answer) => {
      }, () => {});
	  };

		function DialogController($scope, $mdDialog, $timeout, $q, $log) {
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

	    $scope.companiesNames = ['Apple', 'IMB', 'Google'].map((company) => {
        return {
          value: company.toLowerCase(),
          display: company
        };
      });;

	    function createFilterFor(query) {
	      const lowercaseQuery = angular.lowercase(query);
	      return function filterFn(company) {
	        return (company.value.indexOf(lowercaseQuery) === 0);
	      };
	    }

	    const querySearch = (query) => {
	      let results = query ? $scope.companiesNames.filter(createFilterFor(query)) : $scope.companiesNames,
	          deferred;
	      if ($scope.simulateQuery) {
	        deferred = $q.defer();
	        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
	        return deferred.promise;
	      } else {
	        return results;
	      }
    	}

	    const searchCompaniesTextChange = (text) => {
	    	$scope.companies[$scope.indexOfCurrentCompany].companyName = text;
	      $log.info('Text changed to ' + text);
	    }

	    const selectedCompaniesItemChange = (item) => {
	    	$scope.companies[$scope.indexOfCurrentCompany].companyName = item.value;
	      $log.info('Item changed to ' + JSON.stringify(item));
	    }

	    $scope.companies = vm.companies;
	    $scope.indexOfCurrentCompany = vm.indexOfCurrentCompany;
	    $scope.deleteCompany = deleteCompany;
	    $scope.querySearch = querySearch;
	    $scope.searchCompaniesTextChange = searchCompaniesTextChange;
	    $scope.selectedCompaniesItemChange = selectedCompaniesItemChange;
	  }
	}
}
