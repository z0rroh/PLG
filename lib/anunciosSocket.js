// Attach a listener which fires when a connection is established:
/*
io.socket.on('connect', function socketConnected() {

    io.socket.get("/anuncios/subscribe", function(data){
    });

    io.socket.on('anuncio', function messageReceived(message) {
      console.log(message);
      var anuncioId = message.id;
      switch (message.verb) {

        // Handle anuncio creation
        case 'created':
          updateAnuncioInDom(anuncioId, message);
          break;

        // Handle a anuncio changing their name
        case 'updated':
          updateAnuncioInDom(anuncioId, message);
          break;

        // Handle anuncio destruction
        case 'destroyed':
          updateAnuncioInDom(anuncioId, message);
          break;

        default:
          break;
      }

    });

    console.log('Socket Anuncios is now connected!');

});


    function updateAnuncioInDom(anuncioId, message){
          console.log("updateanuncioInDom");
          console.log(message);
          var page = document.location.pathname;
          page = page.replace(/(\/)$/,'');
          switch(page){
              case '/anuncios/index':

              if(message.verb === 'updated'){
                anuncioIndexPage.updateAnuncio(anuncioId, message);
              }
              if(message.verb === 'created'){
                anuncioIndexPage.addAnuncioCreate(message);
              }
              if(message.verb === 'destroyed'){
                anuncioIndexPage.destroyAnuncio(anuncioId);
              }

      }
    }

    var anuncioIndexPage = {
       updateAnuncio: function(id, message){
          console.log("updateanuncio");
       },

       addAnuncioCreate: function(message){
         console.log("addanuncioCreate");
         var obj={
           anuncio: message.data,
           _csrf: window.overlord.crsf || ''
         };
         $('section:nth-child(2)').before(
           window.JST['assets/templates/addAnuncioCreate.ejs']( obj )
         );

       },
       destroyAnuncio: function(id){
         console.log("anuncioDestroy");
         $('section[data-id="'+id+'"]').remove();
       }
    }
*/
