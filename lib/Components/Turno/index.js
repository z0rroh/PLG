
var socketApp = angular.module('socketApp',[]);

socketApp.controller('TurnosController',['$http','$log','$scope',function($http,$log,$scope){
  $scope.predicate = '-id';
  $scope.reverse = false;
  $scope.baseUrl = 'http://localhost:1337';
  $scope.turnoList = [];

  $scope.getAllTurnos = function(){
    io.socket.get('/turnolog/');
    $http.get($scope.baseUrl+'/turnolog/entrar')
    .succes(function(success_data){
      $scope.turnoList = succes_data;
    });
  };

  $scope.getAllTurnos();
  $scope.sendTurno();

  io.socket.on('/turnolog/entrar',function(obj){
    if(obj.verb === 'created'){
      $scope.getAllTurnos()
    }
  }


  }
}])
