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
		User.findByGroup(req.session.User.id_group, function(err,users){
			
			res.view({
				users: users
			});
		});

	},
	create: function(req, res){
		var anuncioObj={
			text: req.param('text'),
			autor: req.session.User.id,
			group: req.session.User.id_group
		}
		console.log(anuncioObj);
		Anuncio.create(anuncioObj,function (err, anuncio) {

			if(err){
				req.session.flash={
					err:err
				}
				return res.redirect('anuncios/new');
			}
			console.log("se creo bien el anuncio");


			res.redirect('anuncios/new/');

		});
	},
	index: function(req, res, next){

		Anuncio.anunciosFindByGroup(req.session.User.id_group, function(err, anuncios){
			console.log(anuncios);
			res.view({
				anuncios: anuncios
			});
		});

	}

};
