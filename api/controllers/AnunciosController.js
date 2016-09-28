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
		/*
		User.findByGroup(req.session.User.id_group, function(err,users){
			res.view({
				users: users
			});
		});
*/

	},
	create: function(req, res){
		var anuncioObj={
			text: req.param('text'),
			autor: req.session.User.id,
			group: req.session.User.id_group
		}
		//console.log(anuncioObj);
		Anuncio.create(anuncioObj,function (err, anuncio) {

			if(err){
				var noAnuncio=[{message: 'No se creo el anuncio'}]
				req.session.flash={
						err: noAnuncio
				}
				return res.redirect('anuncios/new');
			}
			//console.log("se creo bien el anuncio");

			var sucessAnuncio=[{message: 'Anuncio creado correctamente'}]
			req.session.flash={
					err: sucessAnuncio
			}
			res.redirect('anuncios/index');

		});
	},
	index: function(req, res, next){

		Anuncio.anunciosFindByGroup(req.session.User.id_group, function(err, anuncios){
			res.view({
				anuncios: anuncios
			});
		});

	}

};
