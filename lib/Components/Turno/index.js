/*
var socketApp = angular.module('socketApp',[]);

socketApp.controller('TurnosController',['$http','$log','$scope',function($http,$log,$scope){
  $scope.predicate = '-id';
  $scope.reverse = false;
  $scope.baseUrl = 'http://localhost:1337';
  $scope.turnoList = [];
  $scope.user = 'pipe';
  $scope.turno = '';

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
      $scope.turnoList.push(obj.data);
      $scope.$digest();
    }
  })

  $scope.sendTurno = function(){
    io.socket.post('/turnolog/entrar',{user:$scope.user,turno:$scope.turno});
    $scope.turno = "";
  };

}]); */

var template = function(obj){
  return '<section class="Turno col-lg-5 card">'
                  +'<div class="Turno-Content">'+
                  +'<div class="row start-lg">'+
        '<div class="Turno-Info col-lg-4">'+
          '<h5>'+obj.name+'</h5>'+
          '<p>'+obj.start+' - '+obj.end+'</p>'+
        '</div><div class="Turno-Log col-lg-4"><h4>'+obj.cupo+'</h4></div>'+
        '<div class="Turno-Button col-lg-4"><form action="/turnolog/entrar" method="POST" class="Send-Button" accept-charset="utf-8">'+
        '<input type="hidden" name="_method" value="Clear"/>'+
        '<input class="btn-flat material-icons" value="check" type="submit"></input>'+
        '<input type="hidden" name="_csrf" value="<%= _csrf %>"/></form></div></div></div></section>';

};


io.socket.on('Turnolog', function(event){console.log(event)});
io.socket.get('/turnolog/entrar',function(resData, jwres){
  $.each(resData, function(i, item) {
    if(item.day === "ln"){

      //$('#Turnos-Lunes').append(template(item));
    }
  });
});
