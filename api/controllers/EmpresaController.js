/**
 * EmpresaController
 *
 * @description :: Server-side logic for managing empresas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

 var bcrypt=require('bcrypt');

module.exports = {

	new: function (req,res){
		res.view('empresa/new');
	},

  /**
   * `EmpresaController.create()`
   */
  create: function (req, res) {
		var groupObj={
			name: req.param('name'),
			description: req.param('description'),
			ubication: req.param('ubication')
		}

		Group.create(groupObj, function(err, group){
			if(err){
				req.session.flash={
					err:err
				}
				return res.redirect('empresa/new')
			}
			var hash = bcrypt.hashSync(req.param('pass'), 10);
			var userObj={
				name : req.param('user'),
				lastname : req.param('nombre'),
				email : req.param('email'),
				password: hash,
				groups: group.id,
        id_group: group.id,
        admin: true
			}
			User.create(userObj,function (err, user) {

				if(err){
					req.session.flash={
						err:err
					}
					return res.redirect('empresa/new');
				}
				return res.redirect('empresa/new');
			});
		});

  },


  /**
   * `EmpresaController.destroy()`
   */
  destroy: function (req, res) {
    return res.json({
      todo: 'destroy() is not implemented yet!'
    });
  }
};
