/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var bcrypt=require('bcrypt');

module.exports = {

    new:function (req, res){
		//console.log("pagina de registro");
		//res.locals.flash=._clone(req.session.flash);
		res.view();
		//req.session.flas={};

	},

	create: function(req, res){
    var hash = bcrypt.hashSync(req.param('password'), 10);

    var userObj={
			name : req.param('name'),
			lastname : req.param('lastname'),
			email : req.param('email'),
      password: hash
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
			if(err) return next(err);
			if(!user) return next(err);
			res.view({
				user: user
			});
		});
	},

	index: function(req, res, next){
		User.find(function foundUsers(err, users){
			if(err) return next();
			res.json({
				users
			});

		});
	},

	edit: function(req, res, next){
		User.findOne(req.param('id'), function userFounded(err, user){
			if(err) return next(err);
			if(!user) return next(err);
			res.view({
				user: user
			});
		});
	},

	update: function(req, res, next){
		User.update(req.param('id'), req.params.all(), function userUpdate(err){
			if(err) {
				return res.redirect('user/edit/' + req.param('id'));
			}
			res.redirect('group/show');
		});
	},

	destroy: function(req, res, next){
		User.destroy(req.param('id'), function userDestroy(err){
			if(err){
				console.log(err);
				return next(err);
			}
			res.redirect('group/show');
		});
	}



};
