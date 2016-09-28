/**
 * TurnologController
 *
 * @description :: Server-side logic for managing turnologs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  index:function (req,res) {
    /*
    if(req.isSocket && req.method === 'POST') {
      Chat.query('INSERT into `chat` (`user`,`message`) VALUES ("'+data.user+'","'+data.message+'")',function(err,rows){
        if(err) {
          sails.log(err);
          sails.log("Error occurred in database operation");
        }
        else {
          Chat.publishCreate({id: rows.insertId, message :data.message , user:data.user});
        }
      });
    }
    else if(req.isSocket){
      Chat.watch(req.socket);
      sails.log( 'User subscribed to ' + req.socket.id );
    }*/
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
}

};
