export default ngModule => {
  ngModule.component('filterCompanies', {
  	bindings: {
    	companies: '<',
    	filterCompaniesByName: '&',
    	filterCompaniesByProducts: '&'
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
    self.selectedCompaniesItemChange = selectedCompaniesItemChange;
    self.searchCompaniesTextChange = searchCompaniesTextChange;
    self.newState = newState;

    self.companiesProducts = getArrayOfCompaniesProducts();
    self.querySearchProduct = querySearchProduct;
    self.selectedProductItemChange = selectedProductItemChange;
    self.searchProductTextChange = searchProductTextChange;

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

    function searchCompaniesTextChange(text) {
    	self.filterCompaniesByName({patternOfCompanyName: text});
      $log.info('Text changed to ' + text);
    }

    function selectedCompaniesItemChange(item) {
    	self.filterCompaniesByName({patternOfCompanyName: item});
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

    function querySearchProduct (query) {
      let results = query ? self.companiesProducts.filter(createFilterFor(query)) : self.companiesProducts,
          deferred;
      if (self.simulateQuery) {
        deferred = $q.defer();
        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
        return deferred.promise;
      } else {
        return results;
      }
    }

    function searchProductTextChange(text) {
    	self.filterCompaniesByProducts({patternOfCompanyProduct: text});
      $log.info('Text changed to ' + text);
    }

    function selectedProductItemChange(item) {
    	self.filterCompaniesByProducts({patternOfCompanyProduct: item});
      $log.info('Item changed to ' + JSON.stringify(item));
    }

    function getArrayOfCompaniesProducts() {
      const allCompaniesProducts = self.companies.map((company) => company.companyGoods);
      let setOfallCompaniesProducts = [];
      allCompaniesProducts.forEach((arrayOfProducts) => {
      	setOfallCompaniesProducts = setOfallCompaniesProducts.concat(arrayOfProducts);
      });
      setOfallCompaniesProducts = new Set(setOfallCompaniesProducts);
      setOfallCompaniesProducts = [...setOfallCompaniesProducts];
      setOfallCompaniesProducts.forEach((arrayOfGoods) => setOfallCompaniesProducts.concat(arrayOfGoods))
      return setOfallCompaniesProducts.map((company) => {
        return {
          value: company.toLowerCase(),
          display: company
        };
      });
    }
	};
}
