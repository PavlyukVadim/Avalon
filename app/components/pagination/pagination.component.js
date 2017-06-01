export default ngModule => {
  ngModule.component('pagination', {
    bindings: {
      companies: '<',
      pIndexOfCurrentPage: '<',
      changeCurrentPage: '&'
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
    self.numberOfPages = Math.ceil(numberOfCompanies / companiesOnOnePage);
    self.arrayOfPages = ' '.repeat(self.numberOfPages).split('').map((p, i) => i);
    
    self.$onChanges = function (changes) {
      $log.log(changes);
      let numberOfCompanies = self.companies.length;
      self.numberOfPages = Math.ceil(numberOfCompanies / companiesOnOnePage);
      self.arrayOfPages = ' '.repeat(self.numberOfPages).split('').map((p, i) => i);
      self.indexOfCurrentPage = self.pIndexOfCurrentPage;
    };

    const changePage = (newIndex) => {
      self.indexOfCurrentPage = newIndex;
      self.changeCurrentPage({index: newIndex});
    };
    
    const prevPage = () => {
      if(!self.indexOfCurrentPage) return;
      self.indexOfCurrentPage--;
      self.changeCurrentPage({index: self.indexOfCurrentPage});
    };

    const nextPage = () => {
      if(self.indexOfCurrentPage === self.arrayOfPages.length - 1) return;
      self.indexOfCurrentPage++;
      self.changeCurrentPage({index: self.indexOfCurrentPage});
    };

    self.changePage = changePage;
    self.prevPage = prevPage;
    self.nextPage = nextPage;
  };
}
