export default ngModule => {
  ngModule.component('pagination', {
    bindings: {
      companies: '=',
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
    console.log(self.companies);
    const changePage = (newIndex) => {
      self.indexOfCurrentPage = newIndex;
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
