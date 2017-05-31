export default ngModule => {
  ngModule.component('filterCompanies', {
  	controllerAs: 'filterCompanies',
  	controller: containerAppController,
    template: `<div>filter</div>`
	});

	function containerAppController() {
		
	};
}
