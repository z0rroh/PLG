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
		Group.findOne(req.param('id')).populateAll().exec(function(err, group){
			if(err) return next(err);
			res.view({
				group: group
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
		res.redirect('group/index');
	},
	index: function(req, res, next){

		User.findOne(req.session.User.id).populateAll().exec(function(err, user){
			if(err) return next(err);
			res.view({
				user: user
			});
		});
	},
	update: function(req, res, next){
		Group.update(req.param('id'), req.params.all(), function groupUpdate(err){
			if(err) {
				return res.redirect('group/show/' + req.param('id'));
			}
			res.redirect('group/show');
		});
	},
	destroy: function(req, res, next){
		Group.destroy(req.param('id'), function groupDestroy(err){
			if(err){
				return next(err);
			}
			res.redirect('group/index');
		});
	}


};
