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
		User.findOne(req.session.User.id, function (err, user) {
			if(err){

			}
			user.groups.add(
				{
					name: req.param('name'),
					description: req.param('description'),
					ubication: req.param('ubication'),
					id_group_parent: user.id_group
				}
			);
			 user.save(function(err) {});
		});
		return res.redirect('group/new')
	},
	index: function(req, res, next){
		Group.find(function foundGroups(err, groups){
			if(err) return next();
			res.view({
				groups: groups
			});

		});
	},
	update: function(req, res, next){
		Group.update(req.param('id'), req.params.all(), function userUpdate(err){
			if(err) {
				return res.redirect('group/show/' + req.param('id'));
			}
			res.redirect('group/show');
		});
	}


};
