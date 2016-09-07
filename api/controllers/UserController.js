/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

    new:function (req, res){
		//console.log("pagina de registro");
		res.view();

	},

	create: function(req, res){

		var userObj={
			name : req.param('name'),
			lastname : req.param('lastname'),
			email : req.param('email'),
			password : req.param('password'),
			passwordc : req.param('passwordc')
		}


		User.create(userObj,function(err, user) {

			if(err){
				//console.log(JSON.stringify(err));
				req.session.flash={
					err:err
				}
				return res.redirect('user/new');
			}
			console.log("se creo bien el usuario");
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
	}
	
};

