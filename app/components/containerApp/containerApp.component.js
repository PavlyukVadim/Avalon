export default ngModule => {
  ngModule.component('containerApp', {
  	controllerAs: 'containerApp',
  	controller: containerAppController,
    template: `
      <div class="container">
        <div class="row">
      		<div class="col s8">
      		  <list-of-companies></list-of-companies>
      		</div>
      		<div class="col s4">
      		  <filter-companies></filter-companies>
      		</div>
      	</div>
      </div>`
	});

	function containerAppController() {
		
	};
}
