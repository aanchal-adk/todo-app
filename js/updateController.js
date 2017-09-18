angular.module('todoApp')
.controller('updateController',function($scope,$http,$stateParams,$state){
  const baseUrl='http://10.10.3.82:8848/api';
  let itemId = $stateParams.itemId;
  $http.get(`${baseUrl}/todos/${itemId}`)
  .then(function(response){
    // console.log(response.data.data);
    $scope.newTitle=response.data.data.title;
    $scope.newDescription=response.data.data.description;
  })
  
  $scope.updateItem= function(){
    let data = {
      title: $scope.newTitle,
      description: $scope.newDescription,
      iscomplete:"false"
    }
    $http.put(`${baseUrl}/todos/${itemId}`,data)
    .then(function(response){
      $state.go('todo');
    })
  }
})