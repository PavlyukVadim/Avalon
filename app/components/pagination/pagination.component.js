export default ngModule => {
  ngModule.component('pagination', {
    bindings: {
      companies: '<',
    },
    controllerAs: 'pagination',
    controller: paginationController,
    templateUrl: '/components/pagination/pagination.template.html'
  });
  require('./pagination.scss');
  
  function paginationController($timeout, $q, $log) {
    const self = this;
    const companiesOnOnePage = 5;
    self.indexOfCurrentPage = 0;
    let numberOfCompanies = self.companies.length;
    let numberOfPages = Math.ceil(numberOfCompanies / companiesOnOnePage);
    self.arrayOfPages = ' '.repeat(numberOfPages).split('').map((p, i) => i);
    
    self.$onInit = function () {
  $log.log('initializing controllers, setting default values');
  self.hello = "hello world!";
};
self.$onChanges = function (changes) {
  $log.log(changes);
};

    const changePage = (newIndex) => {
      self.indexOfCurrentPage = newIndex;
      self.hello += '0'
    };
    
    const prevPage = () => {
      if(!self.indexOfCurrentPage) return;
      self.indexOfCurrentPage--;
    };

    const nextPage = () => {
      if(self.indexOfCurrentPage === self.arrayOfPages.length - 1) return;
      self.indexOfCurrentPage++;
    };

    self.changePage = changePage;
    self.prevPage = prevPage;
    self.nextPage = nextPage;
  };
}
