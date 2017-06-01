export default ngModule => {
  ngModule.component('myHeader', {
    templateUrl: '/components/header/header.template.html'
  });
  require('./header.scss');
}
