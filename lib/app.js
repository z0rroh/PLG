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
