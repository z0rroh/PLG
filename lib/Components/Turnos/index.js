$(document).ready(function(){
  $('#datatableTurnos').dataTable({
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
  $('#datatable_filter input').attr("placeholder", "Buscar Turno...");


});
