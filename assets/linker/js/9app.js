
$(document).ready(function(){
  var tables = $.fn.dataTable.fnTables(true);

  $(tables).each(function () {
    $(this).dataTable().fnClearTable();
    $(this).dataTable().fnDestroy();
  });

  $('#datatable').DataTable({
    "language":{
      "lengthMenu": "Filas por página _MENU_",
      "info": "Página  _PAGE_ de _PAGES_",
      "infoEmpty": "No hay registros para mostrar",
      "sSearch": "",
      "emptyTable": "No hay registros para mostrar",
      "oPaginate": {
      	"sFirst":    	"Primero",
      	"sPrevious": 	"Anterior",
      	"sNext":     	"Siguiente",
      	"sLast":     	"Último"
      },
    },
    "bAutoWidth" : false,
    "aoColumnDefs": [
      { "sWidth": "5%", "aTargets": [ 0 ] },
      { "sWidth": "20%", "aTargets": [ 1,2,4 ] },
      { orderable: false, targets: -1 },
      { orderable: false, targets: -2 },
      { orderable: false, targets: -3 },
      { orderable: false, targets: -7 },
    ],
    "order": [[ 1, "desc" ]]
  });

  $('#datatable_filter input').attr("placeholder", "Buscar Empleados...");
  $('select').material_select();

    $(".Empleado-Edit").click(function(){
      if($(this).data("link") == "ajax"){
        var user = $(this).attr('value');
        var ajaxURL = '/user/show/' + user
        EmpleadoPage(ajaxURL);

        return false;
      }
    });

    var pathArray = window.location.pathname.split( '/' );
    if(pathArray[1] == 'admin'){
    $('.fixed-action-btn').append('<div class="fixed-action-btn" style="bottom: 45px; right: 24px;"><a href="/populateturnos" class="btn-floating btn-large waves-effect waves-light Button-Float"><i class="large material-icons">file_upload</i></a>  </div>');
    }

    function EmpleadoPage(url){
      $.get({
        url: url
      }).done(function(data){
        $("#Empleado-Name").val(data.name);
        $("#Empleado-Email").val(data.email);
        $("#Empleado-Phone").val(data.phone);
        $("#Empleado-Tokens").val(data.tokens);
        $('#Empleado-Modal').openModal();
        $("#Empleado-Send").attr("action",'/user/update/'+data.id);
      });
    }
});



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
    $('#Nav-Turnos').addClass('is-active');
  }
  if(pathArray[1] == 'anuncios'){
    $('#Nav-Anuncios').addClass('is-active');
  }
  $('.Nav-Button').leanModal();
});


io.socket.on('Turnolog', function(event){console.log(event)});
io.socket.get('/turnolog/entrar',function(resData, jwres){

  $.each(resData, function(i, item) {
    console.log(item);
  });
});


$(document).ready(function(){

  $('#datatable').DataTable({
  });
  $('#datatable_filter input').attr("placeholder", "Buscar Turno...");


});

$(document).ready(function(){
  $('.clockpicker').clockpicker({
    align: 'left',
    donetext: 'Cerrar'
  });
});

