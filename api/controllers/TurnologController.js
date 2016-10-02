/**
 * TurnologController
 *
 * @description :: Server-side logic for managing turnologs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index: function(req,res){
    res.view('turnolog/index');
  },
  entrar:function (req,res) {

      if(req.isSocke && req.method === 'POST') {
        Turnolog.findOne(req.param('id'))
                .then(function(result){

                  var turnolog = result;
                  if(turnolog.users){
                  var resul= false;
                  for(var i in turnolog.users){
                    if(turnolog.users[i].id == req.session.User.id){
                      resul=true;
                    }
                  }
                  console.log(resul);

                  if (resul===false && turnolog.estado===true && turnolog.cupoActual<turnolog.cupoTotal && req.session.User.tokens>0){
                        var userObj = {
                          id: req.session.User.id,
                          name: req.session.User.name
                        };
                        var actual = turnolog.cupoActual;
                        var parsed = parseInt(actual, 10);
                        parsed = parsed + 1;
                        turnolog.cupoActual = parsed;
                        console.log(req.session.User.tokens);
                        turnolog.users.push(userObj);
                        turnolog.save(function(err){
                            req.session.flash={
                              err:err
                            }
                        });
                        req.session.User.tokens = req.session.User.tokens-1;
                        console.log(req.session.User.tokens);
                    }
                  }

                    else{
                      console.log('hello');
                      var userObj = {
                        id: req.session.User.id,
                        name: req.session.User.name
                      };
                      var actual = turnolog.cupoActual;
                      var parsed = parseInt(actual, 10);
                      parsed = parsed + 1;
                      turnolog.cupoActual = parsed;
                      turnolog.users = [];
                      turnolog.users.push(userObj);
                      turnolog.save(function(err){
                          req.session.flash={
                            err:err
                          }
                      });
                      req.session.User.tokens = req.session.User.tokens-1;
                    }
                    Turnolog.publishCreate({name:turnolog.name,start:turnolog.start,end:turnolog.end,
                    day:turnolog.day, cupoTotal: turnolog.cupoTotal, cupoActual: turnolog.cupoActual,
                    estado: turnolog.estado,expiracion: turnolog.expiracion, group: turnolog.group,users:turnolog.users,
                  id_turno: turnolog.id_turno});
        })
        .fail(function(err){
          req.session.flash={
            err:err
          }

        });

      }

      else if(req.isSocket){
        Turnolog.watch(req.socket);
        sails.log( 'User subscribed to ' + req.socket.id );
      }

      if(req.method === 'GET') {
        Turnolog.find({group:req.session.User.id_group},function(err,turnologs){
          if(err) {
            sails.log(err);
            sails.log("Error occurred in database operation");
          }
          else {
            res.send(turnologs);
          }
        });
      }

  },
  vista: function(req,res){
    res.view('/turnolog/vista');
  }

};
