export default ngModule => {
  require('./containerApp/containerApp.component.js')(ngModule);
  require('./listOfCompanies/listOfCompanies.component.js')(ngModule);
  require('./filterCompanies/filterCompanies.component.js')(ngModule);
  require('./pagination/pagination.component.js')(ngModule);
  require('./header/header.component.js')(ngModule);
}
