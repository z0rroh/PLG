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
	}

};

