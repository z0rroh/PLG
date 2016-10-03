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

      if(req.isSocket && req.method === 'POST') {
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

                      if (resul===false && turnolog.estado==='activo' && turnolog.cupoActual<turnolog.cupoTotal && req.session.User.tokens>0){
                          var userObj = {
                            id: req.session.User.id,
                            name: req.session.User.name
                          };
                          var actual = turnolog.cupoActual;
                          var parsed = parseInt(actual, 10);
                          parsed = parsed + 1;
                          turnolog.cupoActual = parsed;

                          turnolog.users.push(userObj);
                          turnolog.save(function(err){
                            var sucessTurno=[{message: 'Se tomo correctamente el turno'}]
                            req.session.flash={
                                err: sucessTurno
                            }
                          });


                          var tk = req.session.User.tokens;

                          tk = tk-1;
                          req.session.User.tokens = tk;
                          req.session.save();
                          User.update({id:req.session.User.id},{tokens:tk},function(err, user) {
                            if (err){
                            }
                            res.send(turnolog)
                          });
                          Turnolog.publishUpdate(turnolog.id,turnolog);

                      }
                    }
                    else{
                      if(turnolog.estado==='activo' && turnolog.cupoActual<turnolog.cupoTotal && req.session.User.tokens>0){
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
                          var sucessTurno=[{message: 'Se tomo correctamente el turno'}]
                          req.session.flash={
                              err: sucessTurno
                          }
                        });
                        var tk = req.session.User.tokens;

                        tk = tk-1;
                        req.session.User.tokens = tk;
                        req.session.save();
                        User.update({id:req.session.User.id},{tokens:tk},function(err, user) {
                          if (err){
                          }
                          res.send(turnolog)
                        });
                      }

                    }
        })
        .fail(function(err){
          var failTurno=[{message: 'No se pudo tomar el turno'}]
          req.session.flash={
              err: failTurno
          }
          res.redirect('/turnolog/index');

        });

      }

      else if(req.isSocket){
        Turnolog.watch(req.socket);
        sails.log( 'User subscribed to ' + req.socket.id );
      }

      if(req.method === 'GET') {
        Turnolog.find({group:req.session.User.id_group,estado: 'activo'},function(err,turnologs){
          if(err) {
            sails.log(err);
            sails.log("Error occurred in database operation");
          }
          else {
            //res.send(turnologs);
            var allDays = [];
            var lunes = [];
            var martes = [];
            var miercoles = [];
            var jueves = [];
            var viernes = [];
            var sabado = [];
            var domingo = [];
            for(var i in turnologs){
              if ( turnologs[i].day === '0' )
                  domingo.push(turnologs[i]);
              if ( turnologs[i].day === '1' )
                  lunes.push(turnologs[i]);
              if ( turnologs[i].day === '2' )
                  martes.push(turnologs[i]);
              if ( turnologs[i].day === '3' )
                  miercoles.push(turnologs[i]);
              if ( turnologs[i].day === '4' )
                  jueves.push(turnologs[i]);
              if ( turnologs[i].day === '5' )
                  viernes.push(turnologs[i]);
              if ( turnologs[i].day === '6' )
                  sabado.push(turnologs[i]);
            }

            for(var i=0; i<7; i++){
              var aux;
              if( i === 0){
                aux = {
                  name: "Domingo",
                  id: i,
                  data: domingo
                }
                allDays.push(aux);
              }
              if( i === 1){
                aux = {
                  name: "Lunes",
                  id: i,
                  data: lunes
                }
                allDays.push(aux);
              }
              if( i === 2){
                aux = {
                  name: "Martes",
                  id: i,
                  data: martes
                }
                allDays.push(aux);
              }
              if( i === 3){
                aux = {
                  name: "Miercoles",
                  id: i,
                  data: miercoles
                }
                allDays.push(aux);
              }
              if( i === 4){
                aux = {
                  name: "Jueves",
                  id: i,
                  data: jueves
                }
                allDays.push(aux);
              }
              if( i === 5){
                aux = {
                  name: "Viernes",
                  id: i,
                  data: viernes
                }
                allDays.push(aux);
              }
              if( i === 6){
                aux = {
                  name: "Sabado",
                  id: i,
                  data: sabado
                }
                allDays.push(aux);
              }
            }

            //console.log(allDays);
            res.send(allDays);
            }
        });
      }

  },
  vista: function(req,res){
    res.view('/turnolog/vista');
  }

};
