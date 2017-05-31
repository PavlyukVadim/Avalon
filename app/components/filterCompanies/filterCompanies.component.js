export default ngModule => {
  ngModule.component('filterCompanies', {
  	bindings: {
    	companies: '<'
  	},
  	controllerAs: 'filterCompanies',
  	controller: filterCompaniesController,
    templateUrl: '/components/filterCompanies/filterCompanies.template.html'
	});
  require('./filterCompanies.scss');
	
	function filterCompaniesController($timeout, $q, $log) {
		const self = this;
    self.simulateQuery = false;
    self.companiesNames = getArrayOfCompaniesNames();
    self.querySearch = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;
    self.newState = newState;

    function newState(state) {
      alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    }

    function querySearch (query) {
      let results = query ? self.companiesNames.filter(createFilterFor(query)) : self.companiesNames,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchTextChange(text) {
      $log.info('Text changed to ' + text);
    }

    function selectedItemChange(item) {
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    function getArrayOfCompaniesNames() {
      const allCompanies = self.companies.map((company) => company.companyName);
      return allCompanies.map((company) => {
        return {
          value: company.toLowerCase(),
          display: company
        };
      });
    }

    function createFilterFor(query) {
      const lowercaseQuery = angular.lowercase(query);
      return function filterFn(company) {
        return (company.value.indexOf(lowercaseQuery) === 0);
      };
    }
	};
}
