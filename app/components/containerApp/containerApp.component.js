export default ngModule => {
  ngModule.component('containerApp', {
  	controllerAs: 'containerApp',
  	controller: appController,
    template: `
      <my-header></my-header>
      <div class="container" ng-cloak>
        <div class="row">
      		<div class="col s8">
      		  <list-of-companies companies="containerApp.model.companies"
                               index-of-current-page="containerApp.indexOfCurrentPage"
                               delete-company-by-index="containerApp.deleteCompanyByIndex(index)"
                               change-current-page="containerApp.changeCurrentPage(index)">
            </list-of-companies>
            <div class="progress-wrapper valign-wrapper" ng-if="containerApp.status != 'loaded'">
              <md-progress-linear md-mode="indeterminate"></md-progress-linear>
            </div>
      		</div>
      		<div class="col s4">
      		  <filter-companies companies="containerApp.model.companies"
                              filter-companies-by-name="containerApp.filterCompaniesByName(patternOfCompanyName)"
                              filter-companies-by-products="containerApp.filterCompaniesByProducts(patternOfCompanyProduct)">
            </filter-companies>
      		</div>
      	</div>
      </div>`
	});
  require('./containerApp.scss');

  const initialArrayOfCompanies = [{
          companyName: 'testName', // уникальное имя, без пробелов
          companyGoods: ['first', 'second', 'third'] // массив со строками
        },{
          companyName: 'testName2', // уникальное имя, без пробелов
          companyGoods: ['first', 'third'] // массив со строками
        },{
          companyName: 'company3', // уникальное имя, без пробелов
          companyGoods: ['first', 'third'] // массив со строками
        },{
          companyName: 'company4', // уникальное имя, без пробелов
          companyGoods: ['first', 'third'] // массив со строками
        },{
          companyName: 'company5', // уникальное имя, без пробелов
          companyGoods: ['first', 'third'] // массив со строками
        },{
          companyName: 'company6', // уникальное имя, без пробелов
          companyGoods: ['first', 'third'] // массив со строками
        },{
          companyName: 'company7', // уникальное имя, без пробелов
          companyGoods: ['first', 'third'] // массив со строками
        },{
          companyName: 'company8', // уникальное имя, без пробелов
          companyGoods: ['first', 'third'] // массив со строками
        },{
          companyName: 'company9', // уникальное имя, без пробелов
          companyGoods: ['first', 'third'] // массив со строками
        },{
          companyName: 'company10', // уникальное имя, без пробелов
          companyGoods: ['first', 'third'] // массив со строками
        },{
          companyName: 'company11', // уникальное имя, без пробелов
          companyGoods: ['first', 'third'] // массив со строками
        }
      ];

	function appController($timeout) {
		const vm = this;
    vm.model = {
      companies: []
    };
    vm.indexOfCurrentPage = 0;

    $timeout(() => {
      vm.model.companies = [].concat(initialArrayOfCompanies);
      vm.status = 'loaded';
    }, 2500);

    const filterCompaniesByName = (patternOfCompanyName) => {
      let companies = [].concat(initialArrayOfCompanies);
      let target = patternOfCompanyName.value || patternOfCompanyName;
      target = target.toLowerCase();
      companies = companies.filter((company) => {
        return ~company.companyName.toLowerCase().search(`^${target}`)
      });
      vm.model.companies = companies;
      changeCurrentPage(0);
    }

    const filterCompaniesByProducts = (patternOfCompanyProduct) => {
      let companies = [].concat(initialArrayOfCompanies);
      let target = patternOfCompanyProduct.value || patternOfCompanyProduct;
      target = target.toLowerCase();
      companies = companies.filter((company) => {
        return company.companyGoods.some((product) => ~product.toLowerCase().search(`^${target}`))
      });
      vm.model.companies = companies;
      changeCurrentPage(0);
    }

    const deleteCompanyByIndex = (index) => {
      const companies = [].concat(vm.model.companies);
      companies.splice(index, 1);
      initialArrayOfCompanies.splice(index, 1);
      vm.model.companies = companies;
      if(initialArrayOfCompanies.length % 5 == 0 && index == initialArrayOfCompanies.length) {
        changeCurrentPage(vm.indexOfCurrentPage - 1);
      }
    }
    
    const changeCurrentPage = (indexOfNewPage) => {
      vm.indexOfCurrentPage = indexOfNewPage;
    }

    /*$http({
      method: 'GET',
      url: 'http://avalon.avalonfaltd.com:3090/companies'
    }).then(function successCallback(response) {
        console.log(response)
      }, function errorCallback(response) {
        console.log('error');
      });*/

    vm.filterCompaniesByName = filterCompaniesByName;
    vm.filterCompaniesByProducts = filterCompaniesByProducts;
    vm.deleteCompanyByIndex = deleteCompanyByIndex;
    vm.changeCurrentPage = changeCurrentPage;
	}
}
