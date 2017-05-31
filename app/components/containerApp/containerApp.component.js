export default ngModule => {
  ngModule.component('containerApp', {
  	controllerAs: 'containerApp',
  	controller: appController,
    template: `
      <div class="container">
        <div class="row">
      		<div class="col s8">
      		  <list-of-companies companies="containerApp.model.companies"></list-of-companies>
      		</div>
      		<div class="col s4">
      		  <filter-companies companies="containerApp.model.companies"></filter-companies>
      		</div>
      	</div>
      </div>`
	});

	function appController() {
		const vm = this;
    vm.model = {
      companies: [{
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
      ]
    };

    /*$http({
      method: 'GET',
      url: 'http://avalon.avalonfaltd.com:3090/companies'
    }).then(function successCallback(response) {
        console.log(response)
      }, function errorCallback(response) {
        console.log('error');
      });*/
	}
}
