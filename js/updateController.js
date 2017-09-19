angular.module('todoApp')
.controller('updateController',function($scope,$stateParams,$state,crudService){
  const baseUrl='http://localhost:3000';
  let itemId = $stateParams.itemId;
  crudService.get(`${baseUrl}/todos/${itemId}`)
  .then(function(response){
    $scope.newTitle=response.data.title;
    $scope.newDescription=response.data.description;
  })
  
  $scope.updateItem= function(){
    let data = {
      title: $scope.newTitle,
      description: $scope.newDescription,
      isComplete:false
    }
    crudService.put(`${baseUrl}/todos/${itemId}`,data)
    .then(function(response){
      $state.go('todo');
    })
  }
})