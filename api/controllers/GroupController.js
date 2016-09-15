/**
 * GroupController
 *
 * @description :: Server-side logic for managing groups
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */


module.exports = {



	new: function(req,res){
		res.view();
	},

	show: function(req, res, next){
		User.find(function foundUsers(err, users){
			if(err) return next();
			res.view({
				users: users
			});

		});
	},

	create: function(req, res){

        // req.param toma el parametro del html con name = ''
		var groupObj={
			name : req.param('name'),
			description : req.param('description'),
			ubication: req.param('ubication')
		}

		Group.create(groupObj,function (err, user) {

			if(err){
				req.session.flash={
					err:err
				}
				return res.redirect('group/show');
			}
			console.log("El grupo se creo con exito");
			res.redirect('group/show/'+group.id);

		});

	}

};
