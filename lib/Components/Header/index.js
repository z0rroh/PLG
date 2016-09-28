

$(document).ready(function(){
  $('#User-dropdown').dropdown({
    belowOrigin: false,
    constrain_width: false,
  });
  var pathArray = window.location.pathname.split( '/' );
  var path = ''
  if(pathArray[1] == 'admin'){
    $('#Nav-Button').append('<a class="Nav-Button btn-floating btn-large" href="#Turnos-Modal"><i class="material-icons">add</i></a>')
  }
  if(pathArray[1] == 'group'){
    $('#Nav-Button').append('<a class="Nav-Button btn-floating btn-large" href="#Empleado-Modal"><i class="material-icons">add</i></a>')
  }
  $('.Nav-Button').leanModal();
});
