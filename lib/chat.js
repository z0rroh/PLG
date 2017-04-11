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
