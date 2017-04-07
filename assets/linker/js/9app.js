


(function(window, document, undefined) {


  var factory = function($, DataTable) {
    "use strict";

    $('.search-toggle').click(function() {
      if ($('.hiddensearch').css('display') == 'none')
        $('.hiddensearch').slideDown();
      else
        $('.hiddensearch').slideUp();
    });

    /* Set the defaults for DataTables initialisation */
    $.extend(true, DataTable.defaults, {
      dom: "<'hiddensearch'f'>" +
        "tr" +
        "<'table-footer'lip'>",
      renderer: 'material'
    });

    /* Default class modification */
    $.extend(DataTable.ext.classes, {
      sWrapper: "dataTables_wrapper",
      sFilterInput: "form-control input-sm",
      sLengthSelect: "form-control input-sm"
    });

    /* Bootstrap paging button renderer */
    DataTable.ext.renderer.pageButton.material = function(settings, host, idx, buttons, page, pages) {
      var api = new DataTable.Api(settings);
      var classes = settings.oClasses;
      var lang = settings.oLanguage.oPaginate;
      var btnDisplay, btnClass, counter = 0;

      var attach = function(container, buttons) {
        var i, ien, node, button;
        var clickHandler = function(e) {
          e.preventDefault();
          if (!$(e.currentTarget).hasClass('disabled')) {
            api.page(e.data.action).draw(false);
          }
        };

        for (i = 0, ien = buttons.length; i < ien; i++) {
          button = buttons[i];

          if ($.isArray(button)) {
            attach(container, button);
          } else {
            btnDisplay = '';
            btnClass = '';

            switch (button) {

              case 'first':
                btnDisplay = lang.sFirst;
                btnClass = button + (page > 0 ?
                  '' : ' disabled');
                break;

              case 'previous':
                btnDisplay = '<i class="material-icons">chevron_left</i>';
                btnClass = button + (page > 0 ?
                  '' : ' disabled');
                break;

              case 'next':
                btnDisplay = '<i class="material-icons">chevron_right</i>';
                btnClass = button + (page < pages - 1 ?
                  '' : ' disabled');
                break;

              case 'last':
                btnDisplay = lang.sLast;
                btnClass = button + (page < pages - 1 ?
                  '' : ' disabled');
                break;

            }

            if (btnDisplay) {
              node = $('<li>', {
                  'class': classes.sPageButton + ' ' + btnClass,
                  'id': idx === 0 && typeof button === 'string' ?
                    settings.sTableId + '_' + button : null
                })
                .append($('<a>', {
                    'href': '#',
                    'aria-controls': settings.sTableId,
                    'data-dt-idx': counter,
                    'tabindex': settings.iTabIndex
                  })
                  .html(btnDisplay)
                )
                .appendTo(container);

              settings.oApi._fnBindAction(
                node, {
                  action: button
                }, clickHandler
              );

              counter++;
            }
          }
        }
        $('select').material_select();
      };

      // IE9 throws an 'unknown error' if document.activeElement is used
      // inside an iframe or frame.
      var activeEl;

      try {
        // Because this approach is destroying and recreating the paging
        // elements, focus is lost on the select button which is bad for
        // accessibility. So we want to restore focus once the draw has
        // completed
        activeEl = $(document.activeElement).data('dt-idx');
      } catch (e) {}

      attach(
        $(host).empty().html('<ul class="material-pagination"/>').children('ul'),
        buttons
      );

      if (activeEl) {
        $(host).find('[data-dt-idx=' + activeEl + ']').focus();
      }
    };

    /*
     * TableTools Bootstrap compatibility
     * Required TableTools 2.1+
     */
    if (DataTable.TableTools) {
      // Set the classes that TableTools uses to something suitable for Bootstrap
      $.extend(true, DataTable.TableTools.classes, {
        "container": "DTTT btn-group",
        "buttons": {
          "normal": "btn btn-default",
          "disabled": "disabled"
        },
        "collection": {
          "container": "DTTT_dropdown dropdown-menu",
          "buttons": {
            "normal": "",
            "disabled": "disabled"
          }
        },
        "print": {
          "info": "DTTT_print_info"
        },
        "select": {
          "row": "active"
        }
      });

      // Have the collection use a material compatible drop down
      $.extend(true, DataTable.TableTools.DEFAULTS.oTags, {
        "collection": {
          "container": "ul",
          "button": "li",
          "liner": "a"
        }
      });
    }

  }; // /factory

  // Define as an AMD module if possible
  if (typeof define === 'function' && define.amd) {
    define(['jquery', 'datatables'], factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS
    factory(require('jquery'), require('datatables'));
  } else if (jQuery) {
    // Otherwise simply initialise as normal, stopping multiple evaluation
    factory(jQuery, jQuery.fn.dataTable);
  }

})(window, document);


$(document).ready(function(){
  var Empleadotable = $('#datatable').DataTable({
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




$(document).ready(function(){

  var Turnotable = $('#datatableTurno').DataTable({
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
      { "sWidth": "10%", "aTargets": [ 0,2,3,4,5,6 ] },
      { "sWidth": "15%", "aTargets": [ 1] },
    ],
    "order": [[ 1, "desc" ]]
  });
  $('#datatableTurno_filter input').attr("placeholder", "Buscar Turno...");



});

$(document).ready(function(){
  $('.clockpicker').clockpicker({
    align: 'left',
    donetext: 'Cerrar'
  });
});

$(document).ready(function(){
   // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
   $('.modal-trigger').leanModal();
 });


 $(".modal-trigger").click(function(){
   if($(this).data("link") == "ajax"){
     var turno = $(this).attr('value');
     var ajaxURL = '/turnolog/showEmpleados/' + turno
     EmpleadoPage(ajaxURL);

     return false;
   }
 });

 function EmpleadoPage(url){
   $.get({
     url: url
   }).done(function(data){

   });
 }

/**
 * app.js
 *
 * Front-end code and event handling for sailsChat
 *
 */

       $(document).ready(function() {

         $("#textareaComentario").keypress(function (e) {
            if(e.which == 13 && !e.shiftKey) {
                $(this).closest("form").submit();
                e.preventDefault();
                return false;
            }
        });
      });



      // Attach a listener which fires when a connection is established:
      io.socket.on('connect', function socketConnected() {

          // Show the main UI
          $('#disconnect').hide();
          $('#chatbox').show();

          // Announce that a new user is online--in this somewhat contrived example,
          // this also causes the CREATION of the user, so each window/tab is a new user.
          io.socket.get("/user/announce", function(data){

            window.me = data;
            // Get the current list of users online.  This will also subscribe us to
            // update and destroy events for the individual users.
            io.socket.get('/user', updateUserList);

          });

          // Listen for the "room" event, which will be broadcast when something
          // happens to a room we're subscribed to.  See the "autosubscribe" attribute
          // of the Room model to see which messages will be broadcast by default
          // to subscribed sockets.


          // Listen for the "user" event, which will be broadcast when something
          // happens to a user we're subscribed to.  See the "autosubscribe" attribute
          // of the User model to see which messages will be broadcast by default
          // to subscribed sockets.

          io.socket.on('user', function messageReceived(message) {
            console.log(message);
            var userId = message.id;
            switch (message.verb) {

              // Handle user creation
              case 'created':
                updateUserInDom(userId, message);
                break;

              // Handle a user changing their name
              case 'updated':
                addOrRemove(message.data);
                updateUserInDom(userId, message);
                break;

              // Handle user destruction
              case 'destroyed':
                console.log("destroy");
                updateUserInDom(userId, message);
                break;

              // Handle private messages.  Only sockets subscribed to the "message" context of a
              // User instance will get this message--see the onConnect logic in config/sockets.js
              // to see where a new user gets subscribed to their own "message" context
              case 'messaged':
                receivePrivateMessage(message.data);
                break;

              default:
                break;
            }

          });



          // Add a click handler for the "Send private message" button
          // startPrivateConversation() is defined in private_message.js.
          $('#private-msg-button').click(startPrivateConversation);


          console.log('Socket is now connected!');

          // When the socket disconnects, hide the UI until we reconnect.
          io.socket.on('disconnect', function() {
            // Hide the main UI
            $('#chatbox').hide();
            $('#disconnect').show();
          });

      });


          function updateUserInDom(userId, message){
                console.log("updateUserInDom");
                console.log(message);
                var page = document.location.pathname;
                page = page.replace(/(\/)$/,'');
                switch(page){
                    case '/group/show':

                    if(message.verb === 'updated'){
                      UserIndexPage.updateUser(userId, message);
                    }
                    if(message.verb === 'created'){
                      UserIndexPage.addUserCreate(message);
                    }
                    if(message.verb === 'destroyed'){
                      UserIndexPage.destroyUser(userId);
                    }

            }
          }

          var UserIndexPage = {
             updateUser: function(id, message){
                console.log("updateUser");
             },

             addUserCreate: function(message){
               console.log("addUserCreate");
               var obj={
                 user: message.data,
                 _csrf: window.overlord.crsf || ''
               };
               $('tr:last').after(
                 window.JST['assets/templates/addUserCreate.ejs']( obj )
               );

             },
             destroyUser: function(id){
               console.log("userDestroy");
               $('tr[data-id="'+id+'"]').remove();
             }
          }
      // Start a private conversation with another user

      function startPrivateConversation() {

        // Get the user list
        var select = $('#users-list');

        // Make sure a user is selected in the list
        if (select.val() === null) {
          return alert('Please select a user to send a private message to.');
        }

        // Get the recipient's name from the text of the option in the <select>
        var recipientName = $('option:selected', select).text();
        var recipientId = select.val();

        // Prompt for a message to send
        var message = prompt("Enter a message to send to "+recipientName);

        // Create the UI for the room if it doesn't exist
        createPrivateConversationRoom({name:recipientName, id:recipientId});

        // Add the message to the room
        addMessageToConversation(window.me.id, recipientId, message);

        // Send the private message

        io.socket.post('/chat/private', {to:recipientId, msg: message});

      }

      // Create the HTML to hold a private conversation between two users
      function createPrivateConversationRoom(penPal) {

        // Get the ID of the HTML element for this private convo, if there is one
        var roomName = 'private-room-'+penPal.id;

        // If HTML for the room already exists, return.
        if ($('#'+roomName).length) {
          return;
        }

        var penPalName = penPal.name == "unknown" ? ("User #"+penPal.id) : penPal.name;

        // Create a new div to contain the room
        var roomDiv = $('<div id="'+roomName+'"></div>');

        // Create the HTML for the room
        var roomHTML = '<h2>Private conversation with <span id="private-username-'+penPal.id+'">'+penPalName+'</span></h2>\n' +
                       '<div id="private-messages-'+penPal.id+'" style="width: 50%; height: 150px; overflow: auto; border: solid 1px #666; padding: 5px; margin: 5px"></div>'+
                       '<input id="private-message-'+penPal.id+'"/> <button id="private-button-'+penPal.id+'">Send message</button">';

        roomDiv.html(roomHTML);

        // Add the room to the private conversation area
        $('#convos').append(roomDiv);

        // Hook up the "send message" button
        $('#private-button-'+penPal.id).click(onClickSendPrivateMessage);


      }

      // Callback for when the user clicks the "Send message" button in a private conversation
      function onClickSendPrivateMessage(e) {

        // Get the button that was pressed
        var button = e.currentTarget;

        // Get the ID of the user we want to send to
        var recipientId = button.id.split('-')[2];

        // Get the message to send
        var message = $('#private-message-'+recipientId).val();
        $('#private-message-'+recipientId).val("");

        // Add this message to the room
        addMessageToConversation(window.me.id, recipientId, message);

        // Send the message
        io.socket.post('/chat/private', {to: recipientId, msg: message});

      }

      // Add HTML for a new message in a private conversation
      function addMessageToConversation(senderId, recipientId, message) {

        var fromMe = senderId == window.me.id;
        var roomName = 'private-messages-' + (fromMe ? recipientId : senderId);
        var senderName = fromMe ? "Me" : $('#private-username-'+senderId).html();
        var justify = fromMe ? 'right' : 'left';

        var div = $('<div style="text-align:'+justify+'"></div>');
        div.html('<strong>'+senderName+'</strong>: '+message);
        $('#'+roomName).append(div);

      }

      // Handle an incoming private message from the server.
      function receivePrivateMessage(data) {

        var sender = data.from;

        // Create a room for this message if one doesn't exist
        createPrivateConversationRoom(sender);

        // Add a message to the room
        addMessageToConversation(sender.id, window.me.id, data.msg);

      }



      // Add a user to the list of available users to chat with
      function addUser(user) {
        if (user.id == me.id) {return;}
        // Get a handle to the user list <select> element
        var select = $('#users-list');

        // Create a new <option> for the <select> with the new user's information
        var option = $('<option id="'+"user-"+user.id+'" value="'+user.id+'">'+(user.name == "unknown" ? "User #" + user.id : user.name)+'</option>');

        // Add the new <option> element

        select.append(option);
      }

      // Remove a user from the list of available users to chat with, by sending
      // either a user object or a user ID.
      function addOrRemove(user) {


        if(user.online === false){
          // Get the user's ID.
          var id = user.id || user;

          var userName = $('#user-'+id).text();

          // Remove the corresponding element from the users list
          var userEl = $('#user-'+id).remove();

          // Re-append it to the body as a hidden element, so we can still
          // get the user's name if we need it for other messages.
          // A silly hack for a silly app.
          userEl.css('display', 'none');
          $('body').append(userEl);

          // Post a user status message if we're in a private convo
          if ($('#private-room-'+id).length) {
            postStatusMessage('private-messages-'+id, userName + ' has disconnected.');
            $('#private-message-'+id).remove();
            $('#private-button-'+id).remove();
          }
       }else if(user.online === true){
                 if (user.id == me.id) {return;}
                 // Get a handle to the user list <select> element
                 var select = $('#users-list');

                 // Create a new <option> for the <select> with the new user's information
                 var option = $('<option id="'+"user-"+user.id+'" value="'+user.id+'">'+(user.name == "unknown" ? "User #" + user.id : user.name)+'</option>');

                 // Add the new <option> element

                 select.append(option);
       }


      }

      // Add multiple users to the users list.
      function updateUserList(data) {
        data.users.forEach(function(user) {
          if (user.id == me.id) {return;}
          addUser(user);
        });
      }
