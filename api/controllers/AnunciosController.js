/**
 * AnunciosController
 *
 * @description :: Server-side logic for managing anuncios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	new: function(req,res){
		res.view();
	},

	show: function(req, res, next){
		Anuncios.find(function foundAnuncios(err, anuncios){
			if(err) return next();
			res.view({
				anuncios: anuncios
			});

		});
	},
	create: function(req, res){
		User.findOne(req.session.User.id, function (err, user) {
			if(err){

			}
			user.anuncios.add(
				{
					text: req.param('text'),
					//estado: req.param('description'),
					autor: user.id,
					id_group: user.id_group
				}
			);
			 user.save(function(err) {});
		});
		return res.redirect('anuncios')
	}
	
};

