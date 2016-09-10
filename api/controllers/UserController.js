/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    new:function (req, res){
		//console.log("pagina de registro");
		//res.locals.flash=._clone(req.session.flash);
		res.view();
		//req.session.flas={};

	},

	create: function(req, res){

		var userObj={
			name : req.param('name'),
			lastname : req.param('lastname'),
			email : req.param('email'),
			password : req.param('password'),
			passwordc : req.param('passwordc')
		}


		User.create(userObj,function (err, user) {

			if(err){
				req.session.flash={
					err:err
				}
				return res.redirect('user/new');
			}
			console.log("se creo bien el usuario");

			req.session.authenticated = true;
			req.session.User = user;

			res.redirect('user/show/'+user.id);



		});


	},
	
	show: function(req, res, next){
		User.findOne(req.param('id'), function userFounded(err, user){
			if(err)
				return next(err);
			res.view({
				user: user
			});
		});
	},

	destroy: function(req, res, next){

		User.findOne(req.param('id'), function foundUser(err){
			if(err) return next(err);

			if(!user) return next('El usuario no existe.');

			User.destroy(req.param('id'), function userDestroyed(err){
				if(err) return next(err);
			});

			res.redirect('user');
		});
		
	}
	

};
