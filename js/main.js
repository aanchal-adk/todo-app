angular.module('todoApp',['ui.router']) // setter method
.config(function($stateProvider,$urlRouterProvider){
  $urlRouterProvider.otherwise('/');
  $stateProvider.state('todo',{
    url:'/',
    templateUrl:'todo.html',
    controller:'TodoController'
  })
  $stateProvider.state('update',{
    url:'/update/:itemId',
    templateUrl:'updateItem.html',
    controller:'updateController'
  })
})