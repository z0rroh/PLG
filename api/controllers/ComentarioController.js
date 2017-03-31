/**
 * ComentarioController
 *
 * @description :: Server-side logic for managing comentarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

		create: function(req, res){
			var commentObj={
				text: req.param('text'),
				autor: req.session.User.name,
				anuncio: req.param('id')
			}
			Comentario.create(commentObj,function (err, comentario) {

				if(err){
					var noAnuncio=[{message: 'No se pudo publicar el comentario'}]
					req.session.flash={
							err: noAnuncio
					}
					return res.redirect('anuncios/new');
				}
				//console.log("se creo bien el anuncio");

				var sucessAnuncio=[{message: 'Comentario creado correctamente'}]
				req.session.flash={
						err: sucessAnuncio
				}
				res.redirect('anuncios/index');

			});
		},

};
