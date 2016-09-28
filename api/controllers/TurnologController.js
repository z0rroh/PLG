/**
 * TurnologController
 *
 * @description :: Server-side logic for managing turnologs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  entrar:function (req,res) {


      //if(req.method === 'POST') {
        Turnolog.findOne(req.param('id'))
                .then(function(result){
                  var turnolog = result;
                  if (turnolog.estado===true && turnolog.cupoActual<turnolog.cupoTotal){
                    if(turnolog.users){
                      for(var i in turnolog.users){
                        if(turnolog.users[i].id == req.session.User.id){
                          console.log('return false');
                          break;
                        }
                      }
                      if(req.session.User.tokens >0){
                        req.session.User.tokens = req.session.User.tokens -1;
                        var userRecord = req.session.User;
                        userRecord.save();
                        var userObj = {
                          id: req.session.User.id,
                          name: req.session.User.name
                        };
                        turnolog.users = [];
                        turnolog.users.push(userObj);
                        turnolog.save(function(err){
                            req.session.flash={
                              err:err
                            }
                        });
                      }
                    }
                    else{
                      var userObj = {
                        id: req.session.User.id,
                        name: req.session.User.name
                      };
                      turnolog.users = [];
                      turnolog.users.push(userObj);
                      turnolog.save(function(err){
                          req.session.flash={
                            err:err
                          }
                      });
                    }
                    /*
                    if(reformattedArray == true){
                      //turnolog.cupoActual = cupoActual++;
                      //req.session.User.tokens = req.session.User.tokens-1;
                      turnolog.users.push({
                        id: req.session.User.id,
                        name: req.session.User.name
                      });
                      console.log(turnolog);
                      turnolog.save(
                      function(err){
                        req.session.flash={
                          err:err
                        }

                      });
                    }*/
                  }

        })
        .fail(function(err){
          req.session.flash={
            err:err
          }

        });

      //}
      /*
      else if(req.isSocket){
        Chat.watch(req.socket);
        sails.log( 'User subscribed to ' + req.socket.id );
      }

      if(req.method === 'GET') {
        Turnolog.find({group:req.session.User.id_group},function(err,turnos){
          if(err) {
            sails.log(err);
            sails.log("Error occurred in database operation");
          }
          else {
            console.log(turnos);
            res.send(turnos);
          }
        });
      }
      */
  },



};
