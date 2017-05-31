export default ngModule => {
  ngModule.component('listOfCompanies', {
  	controllerAs: 'listOfCompanies',
  	controller: listOfCompaniesController,
    templateUrl: '/components/listOfCompanies/listOfCompanies.template.html'
	});

	function listOfCompaniesController($http, $mdDialog) {
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
		    },


		  ]
	  };


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
	        .then(function(answer) {
	          this.status = 'You said the information was "' + answer + '".';
	        }, function() {
	          this.status = 'You cancelled the dialog.';
	        });
	  };

		$http({
		  method: 'GET',
		  url: 'http://avalon.avalonfaltd.com:3090/companies'
		}).then(function successCallback(response) {
		    console.log(response)
		  }, function errorCallback(response) {
		    console.log('error');
		  });


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
	    	$scope.model.companies.splice($scope.indexOfCurrentCompany, 1);
	    	$scope.cancel(); 
	    };

	    $scope.model = vm.model;
	    $scope.indexOfCurrentCompany = vm.indexOfCurrentCompany;
	    $scope.deleteCompany = deleteCompany;
	  }


	}
}
