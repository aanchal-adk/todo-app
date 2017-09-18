angular.module('todoApp') // getter method
.controller('TodoController', function($scope, $http, $state){
  $scope.todoList=[];
  $scope.completedList=[];
  $scope.incompleteList=[];

  showTodo = function(){
    $http.get('http://localhost:3000/todos')
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
      isComplete:"false"
    }
    $http.post('http://localhost:3000/todos',data)
    .then(function(response){
      $scope.title="";
      $scope.description="";
      updateList(response.data);
    },function(error){console.log("error")})
  }

  updateList = function(obj){
    $scope.todoList.push(obj);
    showTodo();
  }
  
  rearrangeList=function(){
    $scope.completedList=[];
    $scope.incompleteList=[];
    $scope.todoList.map(function(item){
      if(item.isComplete==="true"){
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
      $http.delete(`http://localhost:3000/todos/${item.id}`)
      .then(function(response){
        showTodo();
      })
  }
  
  $scope.setIsComplete=function(item){
    let data = {
      title: item.title,
      description: item.description,
      isComplete:"true"
    }
    $http.put(`http://localhost:3000/todos/${item.id}`,data)
    .then(function(response){
      console.log("true",response);
      showTodo();
    },function(error){console.log("error")})
  }
})

// .controller('updateController',function($scope,$http,$stateParams,$state){
//   let itemId = $stateParams.itemId;
//   $http.get(`http://localhost:3000/todos/${itemId}`)
//   .then(function(response){
//     console.log(response);
//     $scope.newTitle=response.data.title;
//     $scope.newDescription=response.data.description;
//   })
  
//   $scope.updateItem= function(){
//     let data = {
//       title: $scope.newTitle,
//       description: $scope.newDescription,
//       isComplete:"false"
//     }
//     $http.put(`http://localhost:3000/todos/${itemId}`,data)
//     .then(function(response){
//       $state.go('todo');
//     })
//   }
// })

