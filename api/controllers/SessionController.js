/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt=require('bcrypt');

module.exports = {
	new: function(req,res){
		res.view('session/new');
	},
	create: function(req, res, next){

		if(!req.param('email') || !req.param('password')) {
			var NoEmailOrPassword =[{message: 'Debe ingresar Email y Contraseña'}]
			req.session.flash={
				err: NoEmailOrPassword
			}
			return res.redirect('session/new');
		}

		User.findOneByEmail(req.param('email'), function foundUser (err, user) {
                if (err) return next(err);

                if(!user) {
                  var noAccountError = [{ name: 'noAccount', message: 'El email ingresado: '+req.param('email') + ' no se encuentra' }]
                  req.session.flash = {
                    err: noAccountError
                  }
                  res.redirect('session/new');
                  return;
                }

                bcrypt.compare(req.param('password'), user.password, function (err, valid) {

                  if (err) return next(err);
                  if(!valid) {
                    var usernamePasswordMismatchError = [{ name: 'usernamePasswordMismatch', message: 'Conbinacion de email y contraseña invalida' }]
                    req.session.flash = {
                      err: usernamePasswordMismatchError
                    }
                    res.redirect('session/new');
                    return;
                  }


                  //if the password is valid we get here and log the user in
                  req.session.authenticated = true;
                  req.session.User = user;
									
                  //redirect the user to the profile page
                  res.redirect('anuncios/index');

                }); //end bcrypt.compare
              });//end findOneByEmail
	},
  destroy: function(req, res, next){
    req.session.destroy();
    res.redirect('/');
  }


};
