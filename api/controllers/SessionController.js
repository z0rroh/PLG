/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	schema: true,

	new: function(req,res){
		res.view();
	},
	create: function(req, res, next){
		var email = req.param('email');
		var password = req.param('password');
		if(!email || password){
			var NoEmailOrPassword =[{message: 'Debe ingresar Email y Contraseña'}]
			req.session.flash={
				err: NoEmailOrPassword
			}
			return res.redirect('/');
		}
	}
	
};

