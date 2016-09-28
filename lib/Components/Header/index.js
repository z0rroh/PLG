

$(document).ready(function(){
  $('#User-dropdown').dropdown({
    belowOrigin: false,
    constrain_width: false,
  });
  var pathArray = window.location.pathname.split( '/' );
  if(pathArray[1] == 'admin'){
    $('#Nav-Button').append('<a class="Nav-Button btn-floating btn-large waves-effect waves-light" href="#Turnos-Modal"><i class="material-icons">add</i></a>');
    $('#Nav-Admin').addClass('is-active');
  }
  if(pathArray[1] == 'group'){
    $('#Nav-Grupos').addClass('is-active');
  }
  if(pathArray[1] == 'turnos'){
    $('#Nav-Button').append('<a class="Nav-Button btn-floating btn-large waves-effect waves-light" href="#Empleado-Modal"><i class="material-icons">add</i></a>')
    $('#Nav-Turnos').addClass('is-active');
  }
  if(pathArray[1] == 'anuncios'){
    $('#Nav-Anuncios').addClass('is-active');
  }
  $('.Nav-Button').leanModal();
});
