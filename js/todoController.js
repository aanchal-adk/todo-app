angular.module('todoApp') // getter method
.controller('TodoController', function($scope, $state, crudService){
  $scope.todoList=[];
  $scope.completedList=[];
  $scope.incompleteList=[];
  const baseUrl='http://localhost:3000';

  showTodo = function(){
    crudService.get(`${baseUrl}/todos`)
    .then(function(response){
      $scope.todoList = response.data;
      rearrangeList();
    })
  }
  showTodo();

  $scope.addTodo = function(){
    let data={
      title:$scope.title,
      description:$scope.description,
      isComplete:false
    }
    crudService.post(`${baseUrl}/todos`,data)
    .then(function(response){
      $scope.title="";
      $scope.description="";
      updateList(response.data);
    },function(error){console.log("error")})
  }

  updateList = function(obj){
    $scope.todoList.push(obj);
    rearrangeList();
  }
  
  rearrangeList=function(){
    $scope.completedList=[];
    $scope.incompleteList=[];
    $scope.todoList.map(function(item){
      if(item.isComplete===true){
        $scope.completedList.push(item);
      }
      else{
        $scope.incompleteList.push(item);
      }
    })
  }
  
  $scope.putNewData=function(item){
      $state.go('update',{'itemId': item.id});
  }
  
  $scope.deleteItem=function(item){
      crudService.delete(`${baseUrl}/todos/${item.id}`)
      .then(function(response){
        showTodo();
      })
  }
  
  $scope.setIsComplete=function(item){
    let data = {
      title: item.title,
      description: item.description,
      isComplete:true
    }
    crudService.put(`${baseUrl}/todos/${item.id}`,data)
    .then(function(response){
      showTodo();
    },function(error){console.log("error")})
  }
})